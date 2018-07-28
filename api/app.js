const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const expressValidation = require('express-validation');
const APIError = require('./helpers/APIError');


const conf = require("./conf");
const jwt = require("./jwt");
const teapot  = require("./routes/teapot.route");
const login  = require("./routes/login.route");
const tags = require("./routes/team.route");
const users = require("./routes/user.route");
const articles = require("./routes/article.route");
const categories = require("./routes/category.route");
const products = require("./routes/product.route");
const projects = require("./routes/project.route");
const auth = require("./routes/auth.route");
const team = require("./routes/team.route");
const timeline = require("./routes/timeline.route");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("[pid: "+process.pid+"] : :method :url :response-time ms "));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(function(req, res, next) { // {{{
  res.header("Access-Control-Allow-Origin", "portal.keioac.jp, localhost");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", " x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  if(req.method == "OPTIONS"){
    res.json({"error":null});
  }else{
    next();
  }
}); // }}}
app.use(
  (req, res, next) =>{ // {{{
    console.log("body, query", req.body, req.query);
    if("json" in req.query){
      try{
        let obj = JSON.parse(req.query.json);
        for(let key in obj){
          req.query[key] = obj[key];
        }
        delete req.query.json;
        next();
      }catch(e){
        res.status(400).json({"error": "bad json format"})
      }
    }else{
      next();
    }
  } // }}}
);

// jwt authorize
app.use(jwt.decodeJWT);
app.use("/v1/auth", auth);
app.use("/v1/login", login);
app.use("/v1/teapot", teapot);
app.use("/v1/teams", team);
app.use("/v1/users", users);
app.use("/v1/articles", articles);
app.use("/v1/categories", categories);
app.use("/v1/products", products);
app.use("/v1/projects", projects);
app.use("/v1/tags", tags);
app.use("/v1/timeline", timeline);

app.get("/v1/pubkey", (req, res, next) =>{
  res.send(jwt.pubkey());
});

app.use((err, req, res, next) => { // {{{
  console.log(err)
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
}); // }}}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);
  res.json({"error": true});
})

module.exports = app;

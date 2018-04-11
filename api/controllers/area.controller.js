const common = require("../common");
const conf = require("../conf");
const areaModel = require("../models/area.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getAreas = async (req, res) => {
  let lang = req.query.lang || "all";
  areaModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      let areas = await Promise.all(result.map(async (area) => {
          if (lang !== "all") {
            let areaId = area._id;
            let an = area.area_name[lang];
            let ac = area.area_code;
            let countries = area.countries;
            return await { areaId: areaId, area_name: an, area_code: ac, countries: countries};
          } else {
            return await area;
          }
        }));
      res.json({"areas": areas});
    } else {
      console.error(result);
      res.status(404).json({"error":"area not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
}

exports.getAreaByAreaCode = async (req, res) => {
  let lang = req.query.lang || "all";
  let ac = req.params.id;
  console.log(ac);
  areaModel.find({area_code: ac}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      let areas = await Promise.all(result.map(async (area) => {
          if (lang !== "all") {
            let areaId = area._id;
            let an = area.area_name[lang];
            let ac = area.area_code;
            let countries = area.countries;
            return await { areaId: areaId, area_name: an, area_code: ac, countries: countries};
          } else {
            return await area;
          }
        }));
      res.json({"areas": areas});
    } else {
      console.error(result);
      res.status(404).json({"error":"area not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
}

exports.postArea = async (req, res) => {
    let body = req.body;
    if (body.countries) body.countries = body.countries.map((id) => {return ObjectId(id);});
    const area = new areaModel(body);
    let result = await area.save((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({"error": "cannot create"});
            return;
        }

        if (result){
          console.log(result);
          res.json({"message": result})
        } else {
            console.error(result)
            res.status(400).json({"error": "cannot create"});
        }
    });
}

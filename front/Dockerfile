### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

COPY ./front/package.json ./front/package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /myapp && cp -R ./node_modules ./myapp

WORKDIR /myapp

COPY ./front .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/react-scripts build


### STAGE 2: Setup ###
ARG NGINX_CONF

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY ./front/nginx/$NGINX_CONF /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy build files
COPY --from=builder /myapp/build /usr/share/nginx/hgml

CMD ["nginx", "-g", "daemon off;"]

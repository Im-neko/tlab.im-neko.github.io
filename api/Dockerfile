FROM node:9.11.2
 
RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global forever

COPY ./keys /var/keys

WORKDIR /src

ARG APP_ENV 
ARG SLACK_REDIRECT_URI 
ARG MONGO_URI
ENV APP_ENV ${APP_ENV} 
ENV SLACK_REDIRECT_URI ${SLACK_REDIRECT_URI} 
ENV MONGO_URI ${MONGO_URI}

CMD ["bash", "-c", "npm install && forever start --append -l /src/api.log /src/bin/www && tail -f /src/api.log"]

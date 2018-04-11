FROM node:9.3.0
 
RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global forever

COPY ./keys /var/keys

WORKDIR /src

CMD ["bash", "-c", "npm install && forever start --append -l /src/api.log /src/bin/www && tail -f /src/api.log"]

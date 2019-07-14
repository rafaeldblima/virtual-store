### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10.9.0-alpine as build-stage

ENV APP_PATH /usr/src/app

WORKDIR $APP_PATH

COPY package*.json $APP_PATH/

RUN npm rebuild node-sass

RUN npm install -g @angular/cli

RUN npm install

ENV APP_PATH /usr/src/app
ENV OUTPUT_APP_PATH $APP_PATH/dist/out

ARG ENV_CONFIG

WORKDIR $APP_PATH

COPY . $APP_PATH

RUN npm run build -- --output-path=$OUTPUT_APP_PATH --configuration $ENV_CONFIG


### STAGE 2: Setup ###

FROM nginx:1.15-alpine

ENV APP_PATH /usr/src/app
ENV OUTPUT_APP_PATH $APP_PATH/dist/out

WORKDIR $APP_PATH

COPY --from=build-stage $OUTPUT_APP_PATH $APP_PATH


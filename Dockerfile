FROM mhart/alpine-node:6.7.0

MAINTAINER Rajat Vig <rajat.vig@gmail.com>

ENV APP_DIR /var/app
ENV LOG_DIR /var/log/app
ENV PID_FILE /var/run/supervisord.pid

RUN addgroup -g 9999 docker && \
  adduser -u 9999 -G docker -D -g "Docker User" docker

RUN mkdir -p $APP_DIR && \
  chown docker:docker $APP_DIR && \
  mkdir -p $LOG_DIR && \
  chown docker:docker $LOG_DIR && \
  touch $PID_FILE

COPY . /var/app/
WORKDIR /var/app

RUN \
  apk add --no-cache supervisor git make g++ && \
  npm install && \
  apk del make g++ git && \
  rm -rf /tmp/* /var/cache/apk/*

ENV NODE_ENV production
ENV PORT 3000
ENV LOG_LEVEL info
ENV LOG_FILE /var/log/app/application.log

EXPOSE 3000

CMD ["supervisord", "-n"]

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ARG DEVELOPMENT_MODE

ENV DOCKERIZE_VERSION v0.7.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
&& tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
&& rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["sh", "./entrypoint.sh"]
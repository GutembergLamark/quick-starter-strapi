FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ARG DEVELOPMENT_MODE

COPY init.sh .
RUN chmod +x init.sh

CMD ["sh", "./init.sh"]
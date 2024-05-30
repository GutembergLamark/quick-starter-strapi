FROM node:20.12.2

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ARG DEVELOPMENT_MODE

COPY init.sh .
RUN chmod +x init.sh

CMD ["sh", "./init.sh"]
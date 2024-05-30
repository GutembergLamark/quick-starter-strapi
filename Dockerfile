FROM node:20.12.2

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

COPY .next ./.next

CMD ["yarn", "start"]
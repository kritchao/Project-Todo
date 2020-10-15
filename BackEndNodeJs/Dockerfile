FROM node:latest

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD npm start
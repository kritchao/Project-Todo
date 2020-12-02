FROM node:latest

WORKDIR /usr/src/app/my-app

ENV PATH /app/my-app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD npm start
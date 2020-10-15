FROM node:latest

WORKDIR /usr/src/app/my-app

ENV PATH /app/my-app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD npm start
# JK-Backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9195

CMD ["node", "index.js"]

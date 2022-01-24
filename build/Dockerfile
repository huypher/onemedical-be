FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME shared

RUN npm run build

CMD ["node", "/app/dist/main"]
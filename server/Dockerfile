FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src
COPY package*.json /usr/src/
RUN npm ci && npm cache clean --force
WORKDIR /usr/src/app
COPY . .

CMD ["node", "server.js"]
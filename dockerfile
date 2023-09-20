FROM node:18-alpine

WORKDIR /src
COPY package.json /src/
RUN npm install --production

COPY . /src

EXPOSE 8085

CMD ["node", "server.js"]

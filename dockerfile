FROM node:18-alpine

WORKDIR /src
COPY package.json /src/
RUN npm install --production

COPY . /src

EXPOSE 3000

CMD ["yarn", "start:dev"]

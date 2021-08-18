FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

#RUN npm install --production
RUN npm ci

COPY . .

HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

CMD [ "node", "src/server.js" ]

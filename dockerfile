# Use uma imagem Node.js como base
FROM node:14

WORKDIR /app

COPY package.json tsconfig.json /app/

RUN yarn install

COPY . /app/

RUN yarn run build

EXPOSE 8080

CMD ["yarn", "start"]
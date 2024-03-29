# Use uma imagem Node.js como base
FROM node:16

WORKDIR /app

COPY package.json tsconfig.json /app/

RUN yarn install

COPY . /app/

RUN yarn run build

EXPOSE 4000

CMD ["yarn", "start"]
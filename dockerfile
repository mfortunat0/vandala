FROM node:16.13.2-alpine3.15 as Builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD yarn start
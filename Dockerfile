FROM node:lts

WORKDIR /app
COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]
COPY ./src ./src
RUN yarn install

CMD [yarn, start:dev]
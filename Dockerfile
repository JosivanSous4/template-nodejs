FROM --platform=linux/amd64 node:14-buster-slim as BASE

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

COPY . /home/node/app

RUN apt-get update && \
    apt-get -y install libssl-dev tzdata

RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime
RUN echo "Brazil/East" > /etc/timezone

RUN yarn --ignore-engines

RUN yarn install

RUN yarn prisma generate

RUN yarn prisma migrate deploy

ENV TZ=America/Fortaleza

RUN yarn build

EXPOSE 8881

CMD ["yarn", "start"]
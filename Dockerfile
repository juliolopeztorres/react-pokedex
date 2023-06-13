FROM node:20.3.0

WORKDIR /srv/app

RUN adduser node www-data

COPY ./ .
RUN chown node:node -R .

EXPOSE 3000

USER node

#RUN yarn install

FROM node:19

WORKDIR /frontend

COPY . .

RUN yarn

CMD ["yarn", "next", "dev", "-p", "80"]

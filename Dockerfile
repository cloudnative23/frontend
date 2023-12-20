FROM node:19

WORKDIR /frontend

COPY . .

RUN yarn && yarn build


CMD ["yarn", "next", "start", "-p", "80"]

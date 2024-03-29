# pull the official base image
FROM node:14-alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --global sass
RUN npm i
RUN npm rebuild node-sass --force
# add app
COPY . ./

# start app
CMD ["npm", "start"]
EXPOSE 3000
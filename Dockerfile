FROM node:14-alpine

# change working directory
WORKDIR /var/app

# copy neccessary files
COPY package*.json /var/app/
COPY src /var/app/src

# expose port
EXPOSE 3000

# set environment
ENV NODE_ENV=production

# install dependencies
RUN npm install

# set start command
CMD ["npm", "run", "serve"]

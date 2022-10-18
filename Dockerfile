# This Dockerfile uses docker multi-stage builds
# https://docs.docker.com/develop/develop-images/multistage-build/

# base image
FROM node:18 as build-stage

# set node environment
ENV NODE_ENV=development

# set working directory of build-stage container
WORKDIR /app

# copy files for building
COPY . .

# install dependencies
RUN yarn install --production=false

# ===----------------------------------------------------------------------===
# build the actual running image
FROM node:18 as production-stage

# set node environment
ENV NODE_ENV=production

# set port number
ENV PORT=80

# set working directory of build-stage container
WORKDIR /app

# copy files for production
COPY --from=build-stage /app/data ./data
COPY package.json yarn.lock ./
COPY ./src ./src

# install dependencies
RUN yarn install --production --frozen-lockfile
RUN rm -rf yarn.lock

RUN env
RUN ls -la

# expose default path
EXPOSE $PORT

# start the app
CMD [ "yarn", "start" ]

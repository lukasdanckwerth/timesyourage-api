# This Dockerfile uses docker multi-stage builds
# https://docs.docker.com/develop/develop-images/multistage-build/

FROM node:16-alpine as build-stage
ENV NODE_ENV=development

RUN env

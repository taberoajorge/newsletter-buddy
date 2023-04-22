FROM node:16

RUN apt-get update && \
    apt-get install -y curl

RUN apt-get update && \
    apt-get install -y git

RUN npm install -g pnpm

WORKDIR /app

COPY NewsletterBuddyFrontend .

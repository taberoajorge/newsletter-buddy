FROM node:16

RUN apt-get update && \
    apt-get install -y curl

RUN apt-get update && \
    apt-get install -y git

RUN apt-get update && \
    apt-get install -y postgresql-client

RUN npm install -g pnpm

WORKDIR /app

COPY NewsletterBuddyBackend .

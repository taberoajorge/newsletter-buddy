FROM node:16

RUN apt-get update && \
    apt-get install -y curl git

RUN npm install -g pnpm

WORKDIR /app

COPY NewsletterBuddyFrontend .

RUN pnpm install

CMD ["pnpm", "run", "dev"]

# Stage 1
FROM node:16 as builder

RUN apt-get update -y

RUN npm install -g pnpm

WORKDIR /app

COPY NewsletterBuddyFrontend/package.json ./

COPY NewsletterBuddyFrontend/pnpm-lock.yaml ./

RUN pnpm install

COPY NewsletterBuddyFrontend .

RuN pnpm build

# Stage 2
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/production/nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

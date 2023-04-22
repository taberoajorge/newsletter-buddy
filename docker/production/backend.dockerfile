# Stage 1
FROM node:16 as builder

RUN apt-get update -y

RUN npm install -g pnpm

WORKDIR /app

COPY NewsletterBuddyBackend/package.json ./

COPY NewsletterBuddyBackend/pnpm-lock.yaml ./

RUN pnpm install

COPY NewsletterBuddyBackend .

RuN pnpm build

# Stage 2
FROM node:16

RUN apt-get update -y

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json .

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]

FROM node:20

RUN apt-get update && \
    apt-get install -y curl git postgresql-client


WORKDIR /app

RUN curl -s https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > /wait-for-it.sh \
    && chmod +x /wait-for-it.sh

COPY NewsletterBuddyBackend .

RUN npm install

CMD ["/wait-for-it.sh", "psql_db:5432", "--", "npm", "run", "dev"]

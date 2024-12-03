FROM node:18

ENV DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/postgres?schema=public"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start
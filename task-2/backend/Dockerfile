FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY src ./src

RUN npm run build
RUN npm prune --omit=dev
RUN rm -rf src tsconfig*.json

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
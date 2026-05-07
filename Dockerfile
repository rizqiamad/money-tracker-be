FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json .sequelizerc ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./src

EXPOSE 8080
CMD ["npm", "start"]
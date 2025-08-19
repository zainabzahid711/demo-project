# Stage 1 - Build
FROM node:18 AS builder
WORKDIR /app

# Set npm registry + timeout to avoid install failures
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-timeout 600000

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 - Run
FROM node:18 
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]

# -------- Build Stage --------
FROM node:lts-alpine AS build

# Disable npm extra logs
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy rest of the source code
COPY . .

# Build Vite app
RUN npm run build

# -------- Serve Stage --------
FROM caddy:latest

# Set working directory
WORKDIR /app

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/caddy

# Run Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

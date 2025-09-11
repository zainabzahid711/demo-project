# Multi-stage build for Next.js (using lessons from previous project)
FROM node:18-alpine AS base

# Builder stage
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
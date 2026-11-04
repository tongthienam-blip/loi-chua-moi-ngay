# ============================================================================
# DOCKERFILE - NỀN TẢNG KINH THÁNH CÔNG GIÁO "LỜI CHÚA MỖI NGÀY"
# Multi-stage build tối ưu kích thước và bảo mật chuẩn production
# ============================================================================

# STAGE 1: Cài đặt dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

# STAGE 2: Build ứng dụng Next.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# STAGE 3: Production Runner (Bảo mật tối đa với non-root user)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Tạo người dùng và nhóm không có quyền root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Sao chép standalone output từ Next.js build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

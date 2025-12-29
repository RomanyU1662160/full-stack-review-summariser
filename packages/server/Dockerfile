FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose server port
EXPOSE 3000

# Start server
CMD ["bun", "run", "dev"]

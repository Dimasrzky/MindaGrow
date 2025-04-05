FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Set environment variables
ENV NODE_ENV production

# Expose the port
EXPOSE 3001

# Start the service
CMD ["node", "src/index.js"]
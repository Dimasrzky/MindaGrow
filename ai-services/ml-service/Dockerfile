FROM node:18-alpine

WORKDIR /app

# Install Python and dependencies for TensorFlow.js
RUN apk add --no-cache python3 make g++ py3-pip

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Set environment variables
ENV NODE_ENV production
ENV MODEL_PATH /app/models

# Create directory for model storage
RUN mkdir -p /app/models

# Expose the port
EXPOSE 3002

# Start the service
CMD ["node", "src/index.js"]
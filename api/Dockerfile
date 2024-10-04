# Stage 1: Build Stage
FROM node:18-bullseye-slim as builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production Stage
FROM node:18-bullseye-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the build output from the build stage
COPY --from=builder /app/out /app/out

# Expose the port your API will run on
EXPOSE 3000

# Set the command to run your app
CMD ["node", "out/index.js"]

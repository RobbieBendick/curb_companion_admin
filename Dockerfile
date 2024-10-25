# Use an official Node runtime as a base image
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install app dependencies
RUN NODE_ENV=dev npm install

# Bundle app source
COPY . .

RUN npm run build

# Expose port 80
EXPOSE 5173 

# Command to run the application
CMD ["npm", "start"]

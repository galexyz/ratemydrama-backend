# Use the official Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application files to the working directory
COPY . .

RUN ls

# Expose the port your application is listening on
EXPOSE 3000

# Start the application with Nodemon
CMD ["npm", "start"]

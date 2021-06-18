FROM node:15.10.0-slim

RUN npm install -g nodemon

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# For development
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000

# Script created by me, includes migration and start scripts
CMD npm run start:development
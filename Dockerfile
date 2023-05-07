FROM node:16-alpine

# Add missing shared libraries to your image
RUN apk add --no-cache libc6-compat

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install -g npm@8.19.2 && npm install --force && npm install -g serve

# copy source files
COPY ./ ./

# Building app
RUN npm run build
EXPOSE 3000

# Running app
CMD ["serve", "-s", "build"]
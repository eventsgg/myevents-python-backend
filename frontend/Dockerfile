###########
# BUILDER #
###########

# base image
FROM node:10.13 as builder

RUN mkdir -p /usr/src/app

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

# create build
COPY . /usr/src/app
RUN npm run build



#########
# FINAL #
#########

# base image
FROM nginx:1.15.9

# copy static files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:1.21-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY ["nginx.conf", "/etc/nginx/nginx.conf"]

FROM node:16.13-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM base as final
COPY --from=build /app/docs /usr/share/nginx/html


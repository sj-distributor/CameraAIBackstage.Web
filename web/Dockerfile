FROM node:16-alpine AS build

WORKDIR /dockerweb

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /dockerweb/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN sed -i '/^http {/a \
    gzip on;\n\
    gzip_static on;' /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

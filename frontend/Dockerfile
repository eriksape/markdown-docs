FROM node:14 as build-deps
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm i
COPY ./public ./public
COPY ./src ./src
ENV REACT_APP_BACKEND_URL 'https://mddocs-backend-wcpppu5evq-uc.a.run.app/'
RUN npm run build

FROM nginx:alpine
COPY ./docker/nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

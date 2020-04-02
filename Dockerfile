FROM nginx:1.15.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]

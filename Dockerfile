# Builds a Docker to deliver dist/
FROM nginx:1
COPY dist/ /usr/share/nginx/html
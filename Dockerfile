FROM node:latest AS builder
WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/* 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/pri /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
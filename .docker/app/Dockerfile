# ### STAGE 1: Build ###
FROM node:14 as builder

WORKDIR /app

COPY ./SmartPRM-ClinicModule/ /app
RUN npm install
RUN npm run build

### STAGE 2: Release ###
FROM nginx:stable-alpine

COPY --from=builder /app/dist /app
COPY .docker/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
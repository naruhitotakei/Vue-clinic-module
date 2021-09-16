# ### STAGE 1: Build ###
FROM node:lts as builder
ENV NODE_ENV=development

WORKDIR /app

COPY ./SmartPRM-ClinicModule/ /app
RUN npm install
RUN npm run build

### STAGE 2: Release ###
FROM nginx:stable-alpine

COPY --from=builder /app/dist /app
COPY .docker/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
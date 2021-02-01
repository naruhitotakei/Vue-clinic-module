FROM node:12
LABEL org.opencontainers.image.source https://github.com/Thermidor/SmartPRM-ClinicModule

WORKDIR /app

# Copy application files
COPY ./prmApp /app

# Install
RUN npm install

# Entrypoint
EXPOSE 8080
CMD npm run serve
FROM node:12
LABEL org.opencontainers.image.source https://github.com/Thermidor/SmartPRM-ClinicModule

WORKDIR /app

# Copy application files
COPY ./api /app

# Install
RUN npm install

# Entrypoint
EXPOSE 3080
CMD npm run dev
FROM node:12
WORKDIR /app

# Copy application files
COPY ./frontend /app

# Install
RUN npm install

# Entrypoint
EXPOSE 8080
CMD npm run serve
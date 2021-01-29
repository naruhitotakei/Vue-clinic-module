FROM node:12
WORKDIR /app

# Copy application files
COPY ./api /app

# Install
RUN npm install

# Entrypoint
EXPOSE 3080
CMD npm run dev
FROM node:22

WORKDIR /app

# Install system dependencies for mediasoup
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    make \
    g++ \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
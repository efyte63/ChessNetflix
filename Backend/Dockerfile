FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    make \
    gcc \
    g++ \
 && ln -s /usr/bin/python3 /usr/bin/python

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# .env 파일 복사 (있을 경우)
COPY .env .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
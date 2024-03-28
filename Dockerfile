FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV REACT_APP_BASE_URL=http://localhost:8080/api

EXPOSE 3000

CMD ["npm", "start"]

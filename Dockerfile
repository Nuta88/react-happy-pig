FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=${VITE_API_URL}
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]

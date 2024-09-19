FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc || true
EXPOSE 80
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM node:18
WORKDIR /app
COPY shopping-list-frontend/package*.json ./
RUN npm cache clean --force && npm install --verbose
COPY shopping-list-frontend/ ./
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

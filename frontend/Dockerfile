FROM node:22.5.1-alpine AS build

RUN mkdir /app
WORKDIR /app
COPY app/package.json \
	 app/package-lock.json \
	 ./
RUN npm install

ENV PATH="/app/node_modules/.bin:${PATH}"

COPY app/ .

RUN npm run build --production

# CMD ng serve --host 0.0.0.0 --port 80
FROM nginx:1.27.0-alpine
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
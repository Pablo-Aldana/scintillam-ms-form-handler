FROM node
MAINTAINER Pablo Aldana

LABEL dSimple ms to file upload using middleware that wraps around Busboy.

ENV CONT_IMG_VER ${CONT_IMG_VER}
ENV PORT 8000
ENV NODE_ENV production

RUN mkdir app

COPY . /app

WORKDIR /app
RUN npm install

EXPOSE 8000


CMD ["node","server.js"]
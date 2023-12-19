FROM node:18.0-alpine3.14 as build-stage

LABEL description="A Dockerfile for build Docsify docs."

WORKDIR /docs

RUN npm install -g docsify-cli@latest

EXPOSE 3000/tcp

# ENTRYPOINT docsify serve .
CMD ["docsify", "serve", "."]

# docker ps -a

# docker build -f Dockerfile -t docsify/docs .

# docker run -itp 3000:3000 --name=docsify -v $(pwd):/docs docsify/docs

# https://cloud.tencent.com/developer/article/1970757
# ------------ 打包静态文件 -------------------

FROM node:20 as builder

WORKDIR /build

COPY . /build
# https://registry.npmmirror.com 
# https://npmmirror.com
# corepack enable
# RUN npm config set registry https://registry.npmmirror.com  && \
    # yarn config set registry https://registry.npmmirror.com  && \
RUN    corepack enable && yarn install --network-timeout 100000 && yarn build

# ------------ 打包静态文件 -------------------

FROM nginx:1.25.5 as dist

COPY --from=builder /build/dist /dist
COPY --from=builder /build/default.conf /etc/nginx/conf.d/default.conf
COPY ./gis /gis

EXPOSE 80

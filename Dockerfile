FROM node:current-alpine
LABEL maintainer="Rekey <rekey@me.com>"

ADD src /app/

RUN sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories && \
    apk update && \
    apk add curl && \
    cd /app && node -v && npm -v && npm --verb i

WORKDIR /app
VOLUME /app/config
ENV TZ=Asia/Shanghai
EXPOSE 12335
CMD [ "node", "index.js" ]

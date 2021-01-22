ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
ENV PACKAGES_APK="make gcc g++ glib-dev yarn"

EXPOSE 8391

# Copy data for add-on
COPY src /app
COPY run.sh /
WORKDIR /app

RUN \
    apk add --no-cache --update vips-dev --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
    && apk add --no-cache --update $PACKAGES_APK \
    && cd /app \
    && yarn global add sharp \
    && yarn \
    && yarn run build \
    && chmod a+x /run.sh

CMD [ "/run.sh" ]

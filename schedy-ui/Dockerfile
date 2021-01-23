ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
ENV PACKAGES_APK="vips-dev make gcc g++ glib-dev yarn npm"

EXPOSE 8391

# Copy data for add-on
COPY src /app
COPY run.sh /
WORKDIR /app

USER root

RUN \
   apk add --no-cache --update $PACKAGES_APK --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
    && \
      cd /app \
    && \
      npm i -g --unsafe-perm sharp \
    && \
      yarn \
    && \
      yarn run build \
    && \
      chmod a+x /run.sh

CMD [ "/run.sh" ]

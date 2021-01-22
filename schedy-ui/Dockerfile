ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

EXPOSE 8391

# Copy data for add-on
COPY src /app
COPY run.sh /
WORKDIR /app

RUN apk-add yarn \
    && cd /app \
    && yarn \
    && yarn run build \
    && chmod a+x /run.sh

CMD [ "/run.sh" ]

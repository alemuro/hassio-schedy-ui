ARG BUILD_FROM

FROM node:12-alpine AS builder

ENV NODE_ENV=production

COPY src /app
WORKDIR /app

RUN yarn install 
RUN yarn run build


# -------------------------

FROM $BUILD_FROM

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app /app
COPY run.sh /

RUN apk add yarn jq

CMD [ "/bin/sh", "/run.sh" ]



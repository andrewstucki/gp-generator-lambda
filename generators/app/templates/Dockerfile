FROM gobuffalo/buffalo:v0.14.3 as builder

ENV GOCACHE=/cache

VOLUME ["/cache", "/go/pkg/mod"]

RUN go get github.com/gobuffalo/buffalo-plugins && \
    go get -v github.com/gobuffalo/buffalo-pop && \
    buffalo plugins list && \
    mkdir -p /src

ENV GO111MODULE=on

WORKDIR /src

ENV ADDR=0.0.0.0

ADD go.mod go.sum ./

RUN go mod download

ADD package.json yarn.lock ./

RUN yarn install --no-progress

ENTRYPOINT buffalo pop migrate; buffalo dev

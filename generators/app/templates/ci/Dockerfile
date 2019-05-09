FROM gobuffalo/buffalo:v0.14.3

ENV GO111MODULE=on GOCACHE=/cache

ADD https://raw.githubusercontent.com/eficode/wait-for/f71f8199a0dd95953752fb5d3f76f79ced16d47d/wait-for /bin/wait-for

RUN apt-get update && apt-get install -y -q netcat && rm -rf /var/lib/apt/lists/* && chmod +x /bin/wait-for && mkdir -p /src

WORKDIR /src

ADD package.json yarn.lock ./

RUN yarn install --no-progress

ADD go.mod go.sum ./

RUN go mod download

ENTRYPOINT /bin/wait-for postgres:5432 -- buffalo test

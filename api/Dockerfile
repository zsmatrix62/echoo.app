# https://www.lpalmieri.com/posts/fast-rust-docker-builds/
FROM rust as builder
WORKDIR app
COPY . .
RUN rustup component add rustfmt
RUN cargo install --path .

FROM debian:buster-slim
WORKDIR app
COPY --from=builder /app/target/release/echoo-app-api /usr/local/bin
ENTRYPOINT ["echoo-app-api"]
# https://www.lpalmieri.com/posts/fast-rust-docker-builds/
FROM rust as builder
WORKDIR app
COPY . .
RUN rustup component add rustfmt
RUN cargo install --path .

FROM ubuntu
RUN apt-get update && apt-get install liblcms2-2
WORKDIR app
COPY --from=builder /app/target/release/echoo_app_api /usr/local/bin
ENTRYPOINT ["echoo_app_api"]
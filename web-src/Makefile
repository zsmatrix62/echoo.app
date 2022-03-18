
dev:
	yarn install --force && yarn start

build-image:build
	docker build -t echoo-app-web .

build:
	yarn build

GRPC_OUT_DIR = ./src/app/libs/proto
PROTOC_GEN_TS_PATH = ./node_modules/.bin/protoc-gen-ts

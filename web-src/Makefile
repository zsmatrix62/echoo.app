
dev:
	yarn install && yarn start

build-image:build
	docker build -t echoo-app-web .

build: proto
	yarn build

GRPC_OUT_DIR = ./src/app/libs/proto
PROTOC_GEN_TS_PATH = ./node_modules/.bin/protoc-gen-ts

proto:
	rm -rf ${GRPC_OUT_DIR}
	mkdir -p ${GRPC_OUT_DIR}
	protoc \
	--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
	-I=../api/proto/devutils \
    --js_out=import_style=commonjs,binary:${GRPC_OUT_DIR} \
    --ts_out="service=grpc-web:${GRPC_OUT_DIR}" \
    ../api/proto/devutils/*.proto

	git add ${GRPC_OUT_DIR}
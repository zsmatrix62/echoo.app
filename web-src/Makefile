dev: install
	yarn start

build-web: install
	yarn build

build-gh-web: install
	yarn build-gh

deploy: build-gh-web
	echo 'web.echoo.app' > ./build/CNAME && yarn gh-pages -d build

install:
	yarn install

protobuf-src-dir = ../api/proto

web-src = ./src
tsProtoLibOutDir = ${web-src}/libs/api/proto

proto:
	# "ts-proto": "^1.82.2",
	rm -rf $(tsProtoLibOutDir)
	mkdir -p $(tsProtoLibOutDir)
	protoc \
	-I${protobuf-src-dir} \
	--js_out=import_style=commonjs,binary:${tsProtoLibOutDir} \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:${tsProtoLibOutDir} \
	${protobuf-src-dir}/*.proto
	cd ${tsProtoLibOutDir}

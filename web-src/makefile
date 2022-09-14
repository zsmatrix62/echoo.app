dev: install
	npm start

build-web: install
	npm build

build-gh-web: install
	npm build-gh

deploy: build-gh-web
	echo 'web.echoo.app' > ./build/CNAME && gh-pages build -d ./build --repo https://github.com/zsmatrix62/echoo.app.git

install:
	npm install --force

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

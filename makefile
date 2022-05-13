dev-tauri:
	yarn install &&	RUST_DEBUT=1  yarn tauri dev

dev-web:wasm
	cd web-src && make dev

build-web:wasm
	cd web-src && make build

build-bundle: c wasm
	yarn install && cd web-src && make build-web && cd .. && yarn tauri build

build-debug-bundle: c wasm
	yarn install && cd web-src && make build-web && cd .. && yarn tauri build --debug

wasm:
	cd wasm-api && wasm-pack build && cd ../web-src && yarn install --force && cd ..
c:
	cargo clippy --fix --allow-dirty --allow-staged

gh: wasm
	cd ./web-src && make deploy

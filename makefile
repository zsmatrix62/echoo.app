dev-tauri:
	yarn install &&	RUST_DEBUT=1  yarn tauri dev

dev-web:wasm
	cd web-src && make dev

build-web:wasm
	cd web-src && make build

build-bundle: icon c wasm
	yarn install && cd web-src && make build-web && cd .. && yarn tauri build

build-debug-bundle: icon c wasm
	yarn install && cd web-src && make build-web && cd .. && yarn tauri build --debug

wasm:
	cd wasm-api && wasm-pack build && cd ../web-src && yarn install --force && cd ..

c:
	cargo clippy --fix --allow-dirty --allow-staged

icon:
	yarn global add git+https://github.com/tauri-apps/tauricon.git
	yarn icon

gh: wasm
	cd ./web-src && make deploy

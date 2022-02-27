dev-tauri:
	yarn install &&	RUST_DEBUT=1  yarn tauri dev

dev-api:
	cd api && cargo run main.rs

dev-web:
	cd web-src && make dev

build-bundle: c
	yarn install && cd web-src && make build && cd .. && yarn tauri build

build-api-image: c
	docker build -t echoo-app-api ./api

c:
	cargo clippy --fix --allow-dirty --allow-staged
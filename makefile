dev-api:
	cd api && cargo run main.rs

build-tauri: c
	yarn install && yarn tauri build

dev-tauri:
	yarn install &&	yarn tauri-dev dev

build-api-image: c
	docker build -t echoo-app-api ./api

c:
	cargo clippy --fix --allow-dirty
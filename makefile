dev-api:
	cd api && cargo run main.rs

build-tauri:
	yarn install && yarn tauri build

dev-tauri:
	yarn install &&	yarn tauri-dev dev

build-api-image:
	docker build -t echoo-app-api ./api
dev-tauri:
	yarn install &&	RUST_DEBUT=1  yarn tauri dev

dev-web:wasm
	cd web-src && make dev

build-web:wasm
	cd web-src && make build

build-bundle: c wasm
	cd web-src && make build-web && cd .. && yarn tauri build

build-debug-bundle: c wasm
	cd web-src && make build-web && cd .. && yarn tauri build --debug

wasm:
	cd wasm-api && wasm-pack build && cd ../web-src && yarn install --force && cd ..

c:
	cargo clippy --fix --allow-dirty --allow-staged

icon:
	yarn global add git+https://github.com/tauri-apps/tauricon.git
	yarn icon
gh: wasm
	cd ./web-src && make deploy

build-mac:
	plutil -convert xml1 ./entitlements.plist
	codesign --force --verbose --deep --sign "Apple Development: Chiang Hwang (RVNSC87L4G)" --entitlements ./entitlements.plist ./target/release/bundle/macos/Echoo.app

	productbuild --component target/release/bundle/macos/Echoo.app /Applications target/release/bundle/macos/Echoo.pkg --sign "3rd Party Mac Developer Installer: Chiang Hwang (6T8X94ZY3T)" --product ./entitlements.plist

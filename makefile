dev-tauri:
	npm install &&	RUST_DEBUT=1  yarn tauri dev

dev-web:wasm
	cd web-src && make dev

build-web:wasm
	cd web-src && make build

build-bundle: c wasm
	cd web-src && make build-web && cd .. && npm run tauri build

build-debug-bundle: c wasm
	cd web-src && make build-web && cd .. && npm run tauri build --debug

wasm:
	cd wasm-api && wasm-pack build && cd ../web-src && npm install --force && cd ..

test-wasm:
	cd wasm-api && sudo cargo watch -s "wasm-pack test --headless --chrome"

c:
	# cargo clippy --fix --allow-dirty --allow-staged

icon:
	npm global add git+https://github.com/tauri-apps/tauricon.git
	npm icon
gh: wasm
	cd ./web-src && make deploy

TARGET_PATH_BASE = target/release/bundle/macos/Echoo
APP_SIGN_IDENTITY = "3rd Party Mac Developer Application: Chiang Hwang (6T8X94ZY3T)"
INSTALLER_SIGN_IDENTITY = "3rd Party Mac Developer Installer: Chiang Hwang (6T8X94ZY3T)"
ENTITLEMENTS_PLIST = ./entitlements.plist

build-mac:
	plutil -convert xml1 ${ENTITLEMENTS_PLIST}
	codesign --force --verbose --deep --sign ${APP_SIGN_IDENTITY}  ./${TARGET_PATH_BASE}.app
	codesign --force --verbose --deep --sign ${APP_SIGN_IDENTITY} --entitlements ${ENTITLEMENTS_PLIST} ./${TARGET_PATH_BASE}.app
	productbuild --component ${TARGET_PATH_BASE}.app /Applications ${TARGET_PATH_BASE}.pkg --sign ${INSTALLER_SIGN_IDENTITY} --product ${ENTITLEMENTS_PLIST}

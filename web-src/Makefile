dev: link-local
	yarn install --force && yarn start

build-web: link-local
	yarn build

build-gh-web: link-local
	yarn build-gh

deploy:build-gh-web link-local
	yarn gh-pages -d build

link-local:
	npm link ./ext_libs/normalize-url

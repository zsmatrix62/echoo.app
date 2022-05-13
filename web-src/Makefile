dev:
	yarn install --force && yarn start

build-web:
	yarn build

build-gh-web:
	yarn build-gh

deploy:build-gh-web
	yarn gh-pages -d build

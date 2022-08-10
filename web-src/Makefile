dev: install
	yarn start

build-web: install
	yarn build

build-gh-web: install
	yarn build-gh

deploy: build-gh-web
	echo 'web.echoo.app' > ./build/CNAME && yarn gh-pages -d build

install:
	yarn install

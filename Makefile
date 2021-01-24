.ONESHELL:

deps: 
	cd schedy-ui/src
	yarn install

build: deps
	cd schedy-ui/src
	yarn build

server:
	cd schedy-ui/src
	yarn dev
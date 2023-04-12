serve-client-web:
	nx serve client-web

build-client-web:
	nx build client-web


dockerImageTag=echoo-client-web
ssh_target=p1

build-client-web-image: build-client-web
	docker buildx build --platform=linux/amd64 -t ${dockerImageTag}:latest -f ./apps/client-web/Dockerfile .

deploy:export-image
	# transfer image to server
	scp $(dockerImageTag).tar $(ssh_target):~/
	# stop container, remove old image, load new image
	ssh $(ssh_target) "docker rm -f $(dockerImageTag) && docker rmi -f $(dockerImageTag) && docker image load -i $(dockerImageTag).tar && rm -f $(dockerImageTag).tar"
	# start container by new image by user account 'app'
  ssh -ttt $(ssh_target) "sh -c 'docker rm -f $(dockerImageTag) && docker run --rm --name $(dockerImageTag) -p 8900:80 -d $(dockerImageTag)'"
	# cleansing
	rm $(dockerImageTag).tar
	ssh $(ssh_target) "rm -f ~/$(dockerImageTag).tar"

export-image:build-client-web-image
	docker save $(dockerImageTag) > $(dockerImageTag).tar


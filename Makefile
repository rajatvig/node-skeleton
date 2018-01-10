PACKAGE_VERSION=`node -pe "require('./package.json').version"`

OWNER=rajatvig
IMAGE_NAME=node-skeleton
QNAME=$(OWNER)/$(IMAGE_NAME)

GIT_TAG=$(QNAME):$(TRAVIS_COMMIT)
BUILD_TAG=$(QNAME):$(PACKAGE_VERSION).$(TRAVIS_BUILD_NUMBER)
LATEST_TAG=$(QNAME):latest

DC=$(if $(LOCAL),docker-compose -f docker-compose.yml -f docker-compose.local.yml,docker-compose)

YARN=run test yarn run

.PHONY: help
.DEFAULT_GOAL := help

login:
	@docker login -u "$(DOCKER_USER)" -p "$(DOCKER_PASS)"

stop: ##Stop all Docker Containers run in Compose
	$(DC) stop

clean: stop ## Clean all Docker Containers and Volumes
	$(DC) down --rmi local --remove-orphans -v
	$(DC) rm -f -v

build: clean ## Rebuild the Docker Image for use by Compose
	$(DC) build

lint: ## Lint the Source Code and Dockerfile
	$(DC) run dockerlint
	$(DC) $(YARN) lint

test: stop ## Run all Tests
	$(DC) $(YARN) test

cover: stop ## Generate Coverage Data
	$(DC) $(YARN) cover

run: stop ## Run the Application
	$(DC) up

build_image: ## Build the Docker Image
	docker build -t $(GIT_TAG) .

tag_image: ## Tag the built Docker Image
	docker tag $(GIT_TAG) $(LATEST_TAG)
	docker tag $(GIT_TAG) $(BUILD_TAG)

push_image: login ## Push the built Docker Image to DockerHub
	docker push $(GIT_TAG)
	docker push $(BUILD_TAG)
	docker push $(LATEST_TAG)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

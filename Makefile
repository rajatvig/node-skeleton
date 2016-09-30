PACKAGE_VERSION=`node -pe "require('./package.json').version"`

OWNER=rajatvig
IMAGE_NAME=node-skeleton
QNAME=$(OWNER)/$(IMAGE_NAME)

GIT_TAG=$(QNAME):$(TRAVIS_COMMIT)
BUILD_TAG=$(QNAME):$(PACKAGE_VERSION).$(TRAVIS_BUILD_NUMBER)
LATEST_TAG=$(QNAME):latest

DC=docker-compose
DC_L=docker-compose -f docker-compose.yml -f docker-compose.local.yml

NPM=$(DC) run test npm run

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

install: ## Install NPM Packages on the Local FS
	npm install

lint: ## Lint the Source Code and Dockerfile
	$(DC) run dockerlint
	$(NPM) lint

test: stop ## Run all Tests
	$(NPM) test

test_local: stop ## Run all Tests and mount the current working directory
	$(DC_L) run test npm run cover

cover: stop ## Generate Coverage Data
	$(NPM) cover

run: stop ## Run the Application
	$(DC) up

run_local: stop ## Run the Application and mount the current working directory
	$(DC_L) up

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

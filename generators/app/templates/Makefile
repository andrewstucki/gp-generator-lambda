.PHONY: default
default:
	@docker-compose build
	@docker-compose run --rm dev

.PHONY: test
test:
	@docker-compose -f ./ci/docker-compose.yml build
	@docker-compose -f ./ci/docker-compose.yml run --rm test

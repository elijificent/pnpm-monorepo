SHA := $(shell git rev-parse --short HEAD)

git-archive:
	git archive --format=zip --output=./archive-$(SHA).zip HEAD

pnpm-build:
	pnpm --filter @pnpm-project/types run build
	pnpm --parallel --filter '!@pnpm-project/*' run build
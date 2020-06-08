export DOCKER_BUILDKIT=1
build_visual_container:
	docker build --file VisualTestingDockerfile -t visual-container .

build_e2e_container:
	docker build --file E2ETestingDockerfile -t e2e-container .

build: build_e2e_container build_visual_container

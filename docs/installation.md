# Installation
## Requirements
### Software Requirements
- Ubuntu 22.04 and later
- [Docker 24.0.6 and later](https://docs.docker.com/engine/install/)
- [docker-compose plugin](https://docs.docker.com/compose/install/linux/)
- [kurtosis](https://docs.kurtosis.com/install/)

### Hardware Requirements
- At least 8-cores CPU and 16GB of memory
- At least 500GB disk space

## Installation Steps
* Clone the repository: `git clone -b bf https://github.com/tsinghua-cel/attacker-service bunnyfinder`
* Enter the directory: `cd bunnyfinder`
* Build the docker images: `make docker`

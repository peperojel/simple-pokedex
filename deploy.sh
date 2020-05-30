#!/bin/bash

# Deploy the simple-pokedex full-stach app.

# Verify that docker and docker-compose are up and running as expected.
echo "Verifying that docker and docker-compose are up and running..."

docker info &> /dev/null
if [[ "${?}" -ne 0 ]]; then
  echo "  docker [FAILED]" >&2
  exit 1
fi
echo "  Docker [OK]"

docker-compose version &>  /dev/null
if [[ "${?}" -ne 0 ]]; then
  echo "  docker-compose [FAILED]" >&2
  exit 1
fi
echo "  docker-compose [OK]"

# Deploy configuration
echo "Configuring the deployment..."

# Get the public-dns of the current instance.
PUBLIC_DNS=$(curl http://169.254.169.254/latest/meta-data/public-hostname)
if [[ "${?}" -ne 0 ]]; then
  echo "Error while trying to get the public-hostname of the instance." >&2
  exit 1
fi

# Replace backend IP with PUBLIC_DNS
FILE_1="./client/src/components/PokeGrid/PokeGrid.js"
FILE_2="./client/src/components/PokeDetails/PokeDetails.js"
for FILE in "${FILE_1}" "${FILE_2}";
  do
    sed -i "s+backend+${PUBLIC_DNS}+" ${FILE}
  done

# Build and deploy...
echo "Building the services..."
docker-compose build --no-cache

echo "Deploying the services..."
docker-compose up -d

echo
echo
echo "The app was deployed succesfully."
echo "Now configure security groups to allow incomme traffic for ports 80 and 3000."
echo "Once ready, you can acess the service on:"
echo "  ${PUBLIC_DNS}"

exit 0
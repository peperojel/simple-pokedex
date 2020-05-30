#!/bin/bash

# Installs and configure docker and docker-compose.

# Installation of docker.

if [[ "${UID}" -ne 0 ]]
then
  echo "Execute this script with root privileges." >&2
  exit 1
fi

echo "Installing docker..."
yum update -y &> /dev/null
amazon-linux-extras install -y docker

echo "Configuring docker..."
service docker start &> /dev/null
usermod -a -G docker ec2-user &> /dev/null

# Installation of docker-compose.

echo "Installing docker-compose..."
curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
echo "Configuring docker-compose..."
chmod +x /usr/local/bin/docker-compose &> /dev/null

echo
echo
echo "Script ran succesfully."
echo "Now restart your SSH session."
exit 0
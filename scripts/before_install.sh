#!/bin/bash

# Update the system
sudo yum update -y

# Install Node.js
sudo yum install -y nodejs npm

# Source the secrets
source /home/ec2-user/ChecksAndBalances/secrets.env

# Set the environment variable system-wide
echo "TEST_MONGODB_URI=$TEST_URI" | sudo tee -a /etc/environment
source /etc/environment

# Optionally, for security, remove the secrets file after using it
rm /home/ec2-user/ChecksAndBalances/secrets.env

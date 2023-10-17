#!/bin/bash

# Update package lists
sudo apt-get update

# Install dependencies (example: nginx)
sudo apt-get install -y nginx

# Stop the service if it's running (example: nginx)
sudo systemctl stop nginx

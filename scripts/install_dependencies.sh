#!/bin/bash

# Update package lists
sudo yum update

# Install dependencies 
sudo yum install -y nginx
sudo yum install -y curl


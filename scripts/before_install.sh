#!/bin/bash

# Define the project directory
PROJECT_DIR="/home/ec2-user/ChecksAndBalances/WebApp"

# Remove the existing node_modules directory
rm -rf "$PROJECT_DIR/frontend/node_modules"
rm -rf /home/ec2-user/ChecksAndBalances/WebApp/frontend/node_modules
rm -rf "$PROJECT_DIR/node_modules"
rm -rf /home/ec2-user/ChecksAndBalances/WebApp/node_modules


# Optionally, remove other generated files or directories
rm -rf "$PROJECT_DIR/frontend/dist"
rm -rf "$PROJECT_DIR/frontend/build"

# If using a build tool like webpack, you might also have a clean command
# npm run clean


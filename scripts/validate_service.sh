#!/bin/bash

# Check if the service is running (example: nginx)
if systemctl status nginx | grep "active (running)"; then
    exit 0
else
    exit 1
fi

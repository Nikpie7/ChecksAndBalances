#!/bin/bash
# Navigate to the project directory


cd /home/ec2-user/ChecksAndBalances/WebApp/frontend

pm2 kill

npm install


cd /home/ec2-user/ChecksAndBalances/WebApp

npm install
#!/bin/bash
# Navigate to the project directory


cd /home/ec2-user/ChecksAndBalances/WebApp/frontend

pm2 kill

npm ci
npm install -g create-react-app
npm install -g nodemon
npm install react-router-dom


cd /home/ec2-user/ChecksAndBalances/WebApp

npm ci
npm install express --save
npm install body-parser
npm install mongodb
npm install cors
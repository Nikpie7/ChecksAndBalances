#!/bin/bash
# Navigate to the project directory
cd /home/ec2-user/ChecksAndBalances/WebApp
# Install project dependencies
npm install
npm install express --save
npm install body-parser
npm install mongodb
npm install cors

cd /home/ec2-user/ChecksAndBalances/WebApp/frontend
npm install
npm install -g create-react-app
npm install -g nodemon
npm install react-router-dom
npm install pm2 -g
ln -s "$(which node)" /sbin/node
ln -s "$(which npm)" /sbin/npm
ln -s "$(which pm2)" /sbin/pm2
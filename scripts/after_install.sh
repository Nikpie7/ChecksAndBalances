#!/bin/bash
# Navigate to the project directory
cd /home/ec2-user/ChecksAndBalances/WebApp
# Install project dependencies
npm install
npm install express --save
npm install body-parser
npm install mongodb
npm install cors
npm install -g create-react-app
npm install -g nodemon

cd /frontend
npm install
npm 
npm install react-router-dom
# Build the React app
npm run build

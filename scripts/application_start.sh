#!/bin/bash
# Navigate to the project directory
cd /home/ec2-user/ChecksAndBalances/WebApp/frontend
# Start the Node.js server
npm run build >> /home/ec2-user/ChecksAndBalances/deploy_2.log 

pm2 start npm --name "my-app" -- start >> /home/ec2-user/ChecksAndBalances/deploy_2.log 

cd /home/ec2-user/ChecksAndBalances/WebApp
npm run build >> /home/ec2-user/ChecksAndBalances/deploy_2.log 

pm2 start npm --name "my-backend" -- start >> /home/ec2-user/ChecksAndBalances/deploy_2.log 
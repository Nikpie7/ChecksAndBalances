#!/bin/bash
# Navigate to the project directory


# cd /home/ec2-user/ChecksAndBalances/WebApp/frontend



# npm ci


cd /home/ec2-user/ChecksAndBalances/WebApp
pm2 kill

npm ci
npm install dotenv
npm run build

cp /home/ec2-user/.env /home/ec2-user/ChecksAndBalances/WebApp/.env



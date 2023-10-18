#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'cd /home/ec2-user/ChecksAndBalances/WebApp/frontend' >> /home/ec2-user/ChecksAndBalances/deploy.log
cd /home/ec2-user/ChecksAndBalances/WebApp/frontend >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'pm2 start npm --name "react-frontend" -- start' >> /home/ec2-user/ChecksAndBalances/deploy.log
pm2 start npm --name "react-frontend" -- start >> /home/ec2-user/ChecksAndBalances/deploy.log
#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'cd /home/ec2-user/ChecksAndBalances/WebApp/frontend' >> /home/ec2-user/ChecksAndBalances/deploy.log
cd /home/ec2-user/ChecksAndBalances/WebApp/frontend >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'npm install' >> /home/ec2-user/ChecksAndBalances/deploy.log 
npm install >> /home/ec2-user/ChecksAndBalances/deploy.log
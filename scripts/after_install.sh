#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ec2-user/ChecksAndBalances/deploy.log
cd /home/ec2-user/ChecksAndBalances >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'npm install' >> /home/ec2-user/ChecksAndBalances/deploy.log 
npm install >> /home/ec2-user/ChecksAndBalances/deploy.log
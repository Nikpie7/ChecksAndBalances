#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/ChecksAndBalances/deploy.log

echo 'pm2 restart nodejs-express-app' >> /home/ec2-user/ChecksAndBalances/deploy.log
pm2 restart all >> /home/ec2-user/ChecksAndBalances/deploy.log
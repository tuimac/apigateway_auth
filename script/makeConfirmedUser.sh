#!/bin/bash

aws cognito-idp admin-set-user-password \
  --user-pool-id ap-northeast-1_otyqy2Yuu \
  --username test \
  --password P@ssw0rd \
  --permanent

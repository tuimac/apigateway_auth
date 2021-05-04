#!/bin/bash

aws cognito-idp admin-set-user-password \
  --user-pool-id ap-northeast-1_VGxeXJwky \
  --username test \
  --password P@ssw0rd \
  --permanent

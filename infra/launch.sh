#!/bin/bash

aws cloudformation create-stack --stack-name cognitoS3 --region ap-northeast-1 --capabilities CAPABILITY_NAMED_IAM --template-body file://template.yml

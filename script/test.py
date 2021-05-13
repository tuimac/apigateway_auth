#!/usr/bin/env python3

import boto3
import json

s3 = boto3.client('s3')
policy = s3.get_bucket_policy(Bucket='cognito-s3-000')['Policy']
print(type(json.loads(policy)))

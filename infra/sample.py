#!/usr/bin/env python3

import boto3

iam = boto3.client('iam')
response = iam.list_roles()

word = 'AWS'

for role in response['Roles']:
    if word in role['RoleName']:
        print(role['RoleName'])

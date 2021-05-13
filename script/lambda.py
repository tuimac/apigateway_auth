#!/usr/bin/env python3

import boto3
import json
import os
import time

USER_POOL_ID = os.environ.get('USER_POOL_ID')
APP_CLIENT_ID = os.environ.get('APP_CLIENT_ID')
ID_PROVIDER_ID = os.environ.get('ID_PROVIDER_ID')
USER_NAME = os.environ.get('USER_NAME')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
USER_NAME_PREFIX = 'cognitoS3-UserPool-Group'

def create_environment():
    def create_s3_folder():
        path = USER_NAME + '/'
        s3 = boto3.client('s3')
        s3.put_object(Bucket=BUCKET_NAME, Key=path)
        return 'arn:aws:s3:::' + BUCKET_NAME + '/' + path + '*'


    def create_iam_role():
        # IAM Policy
        policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:GetObject",
                        "s3:List*",
                        "s3:PutObject",
                        "s3:DeleteObject"
                    ],
                    "Resource": "*"
                }
            ]
        }            

        # Trust relationship
        trust_relationship = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Federated": "cognito-identity.amazonaws.com"
                    },
                    "Action": "sts:AssumeRoleWithWebIdentity",
                    "Condition": {
                        "StringEquals": {
                            "cognito-identity.amazonaws.com:aud": ""
                        },
                        "ForAnyValue:StringLike": {
                            "cognito-identity.amazonaws.com:amr": "authenticated"
                        }
                    }
                }
            ]
        }

        trust_relationship['Statement'][0]['Condition']['StringEquals']['cognito-identity.amazonaws.com:aud'] = ID_PROVIDER_ID
        policy = json.dumps(policy)
        trust_relationship = json.dumps(trust_relationship)

        # Create IAM Role
        iam = boto3.client('iam')
        policy_arn = iam.create_policy(
            PolicyName = USER_NAME + '_' + USER_NAME_PREFIX,
            PolicyDocument = policy
        )['Policy']['Arn']

        role_arn = iam.create_role(
            RoleName = USER_NAME + '_' + USER_NAME_PREFIX,
            AssumeRolePolicyDocument = trust_relationship,
        )['Role']['Arn']

        time.sleep(5)
        
        iam.attach_role_policy(
            RoleName = USER_NAME + '_' + USER_NAME_PREFIX,
            PolicyArn = policy_arn
        )

        return role_arn

    def create_group(iam_role_arn):
        cognito = boto3.client('cognito-idp')
        response = cognito.create_group(
            GroupName = USER_NAME,
            UserPoolId = USER_POOL_ID,
            RoleArn = iam_role_arn
        )

    def add_user_to_group():
        cognito = boto3.client('cognito-idp')
        response = cognito.admin_add_user_to_group(
            UserPoolId = USER_POOL_ID,
            Username = USER_NAME,
            GroupName = USER_NAME
        )

    def modify_bucket_policy(bucket_key_arn):
        s3 = boto3.client('s3')
        iam = boto3.client('iam')
        policy = s3.get_bucket_policy(Bucket=BUCKET_NAME)['Policy']
        role_arn = iam.get_role(RoleName=(USER_NAME + '_' + USER_NAME_PREFIX))['Role']['Arn']
        added_policy = {
            'Effect': 'Allow',
            'Principal': role_arn,
            'Action': [
                's3:GetObject',
                's3:List*',
                's3:PutObject',
                's3:DeleteObject'
            ],
            'Resource': bucket_key_arn
        }
        policy['Statement'].append(added_policy)
        s3.put_bucket_policy(
            Bucket = BUCKET_NAME,
            Policy = json.dumps(policy)
        )

    # Create S3 Folder
    bucket_key_arn = create_s3_folder()
    # Create IAM Role
    iam_role_arn = create_iam_role()
    # Create AWS Cognito Group
    create_group(iam_role_arn)
    # Make AWS Cognito User join into AWS Cognito Group
    add_user_to_group()
    # Modify S3 Bucket Policy
    modify_bucket_policy(bucket_key_arn)

if __name__ == '__main__':
    create_environment()
    #delete_environment()

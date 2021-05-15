#!/usr/bin/env python3

import boto3
import json
import os
import time
from botocore.exceptions import ClientError

USER_POOL_ID = os.environ.get('USER_POOL_ID')
APP_CLIENT_ID = os.environ.get('APP_CLIENT_ID')
ID_PROVIDER_ID = os.environ.get('ID_PROVIDER_ID')
USER_NAME = os.environ.get('USER_NAME')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
USER_NAME_PREFIX = 'cognitoS3-UserPool-Group'

def create_environment():
    def create_s3_folder():
        try:
            path = USER_NAME + '/'
            s3 = boto3.client('s3')
            s3.put_object(Bucket=BUCKET_NAME, Key=path)
            return 'arn:aws:s3:::' + BUCKET_NAME + '/' + path + '*'
        except ClientError:
            pass

    def create_iam_role():
        try:
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
        except ClientError:
            pass

    def create_group(iam_role_arn):
        try:
            cognito = boto3.client('cognito-idp')
            response = cognito.create_group(
                GroupName = USER_NAME,
                UserPoolId = USER_POOL_ID,
                RoleArn = iam_role_arn
            )
        except ClientError:
            pass

    def add_user_to_group():
        try:
            cognito = boto3.client('cognito-idp')
            response = cognito.admin_add_user_to_group(
                UserPoolId = USER_POOL_ID,
                Username = USER_NAME,
                GroupName = USER_NAME
            )
        except ClientError:
            pass

    def modify_bucket_policy(bucket_key_arn):
        s3 = boto3.client('s3')
        iam = boto3.client('iam')
        policy = json.loads(s3.get_bucket_policy(Bucket=BUCKET_NAME)['Policy'])
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

def delete_environment():
    def delete_roles():
        iam = boto3.client('iam')
        for role in iam.list_roles()['Roles']:
            if USER_NAME_PREFIX in role['RoleName']:
                iam.delete_role(RoleName=role['RoleName'])

    def delete_policies():
        iam = boto3.client('iam')
        for policy in iam.list_policies()['Policies']:
            if USER_NAME_PREFIX in policy['PolicyName']:
                iam.delete_policy(PolicyArn=policy['Arn'])

    delete_roles()
    delete_policies()

if __name__ == '__main__':
    create_environment()
    #delete_environment()

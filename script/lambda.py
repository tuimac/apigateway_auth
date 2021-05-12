#!/usr/bin/env python3

import boto3
import json
import os

USER_POOL_ID = os.environ.get('USER_POOL_ID')
APP_CLIENT_ID = os.environ.get('APP_CLIENT_ID')
ID_PROVIDER_ID = os.environ.get('ID_PROVIDER_ID')
USER_NAME = os.environ.get('USER_NAME')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
USER_NAME_PREFIX = 'cognitoS3-UserPool-Group'

def create_environment():
    def create_s3_folder():
        s3 = boto3.client('s3')
        response = s3.put_object(Bucket=BUCKET_NAME, Key=(USER_NAME + '/'))
        print(response)

    def create_iam_role():
        # IAM Policy
        policy = {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Effect': 'Allow',
                    'Action': [
                        's3:GetObject',
                        's3:ListObject',
                        's3:PutObject',
                        's3:DeleteObject'
                    ],
                    'Resource': '*'
                }
            ]
        }            

        # Trust relationship
        trust_relationship = {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Effect': 'Allow',
                    'Principal': {
                        'Federated': 'cognito-identity.amazonaws.com'
                    },
                    'Action': 'sts:AssumeRoleWithWebIdentity',
                    'Condition': {
                        'StringEquals': {
                            'cognito-identity.amazonaws.com:aud': ''
                        },
                        'ForAnyValue:StringLike': {
                            "cognito-identity.amazonaws.com:amr": 'authenticated'
                        }
                    }
                }
            ]
        }
        trust_relationship['Statement'][0]['Condition']['StringEquals']['cognito-identity.amazonaws.com:aud'] = ID_PROVIDER_ID
        trust_relationship = json.dumps(trust_relationship)

        # Create IAM Role
        iam = boto3.client('iam')
        policy_arn = iam.create_policy(
            PolicyName = NAME + '_' + USER_NAME_PREFIX,
            PolicyDocument = policy
        )['Policy']['Arn']

        role_arn = iam.create_role(
            RoleName = NAME + '_' + USER_NAME_PREFIX,
            AssumeRolePolicyDocument = trust_relationship,
        )['Role']['Arn']

        iam.attach_role_policy(
            RoleName = role_arn,
            PolicyArn = policy_arn
        )

        return role_arn

    def create_group(cognito, iam_role_arn):
        cognito = boto3.client('cognito')
        response = cognito.create_group(
            GroupName = USER_NAME,
            UserPoolId = USER_POOL_ID,
            RoleArn = iam_role_arn
        )

    def add_user_to_group():
        cognito = boto3.client('cognito')
        response = cognito.admin_add_user_to_group(
            UserPoolId = USER_POOL_ID,
            Username = USER_NAME,
            GroupName = USER_NAME
        )

    # Create S3 Folder
    create_s3_folder()
    # Create IAM Role
    iam_role_arn = create_iam_role()
    # Create AWS Cognito Group
    create_group(iam_role_arn)
    # Make AWS Cognito User join into AWS Cognito Group
    add_user_to_group()

if __name__ == '__main__':
    create_environment()
    #delete_environment()

#!/usr/bin/env python3

import boto3
import json
import os

USERPOOLID = os.environ.get('USERPOOLID')
CLIENTID = os.environ.get('CLIENTID')
IDPOOLID = os.environ.get('IDPOOLID')
NAME = os.environ.get('NAME')
PASSWORD = os.environ.get('PASSWORD')

def create_environment():
    def create_iam_role():
        # IAM Policy
        policy = {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Effect': 'Allow',
                    'Action': [
                        's3:Get*',
                        's3:List*'
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
        trust_relationship['Statement'][0]['Condition']['StringEquals']['cognito-identity.amazonaws.com:aud'] = IDPOOLID
        trust_relationship = json.dumps(trust_relationship)

        # Create IAM Role
        iam = boto3.client('iam')
        policy_arn = iam.create_policy(
            PolicyName = NAME + '_' + USERPOOLID,
            PolicyDocument = policy
        )['Policy']['Arn']

        role_arn = iam.create_role(
            RoleName = NAME + '_' + USERPOOLID,
            AssumeRolePolicyDocument = trust_relationship,
        )['Role']['Arn']

        iam.attach_role_policy(
            RoleName = role_arn,
            PolicyArn = policy_arn
        )

        return role_arn

    def create_user(cognito):
        response = cognito.sign_up(
            ClientId = CLIENTID,
            Username = NAME,
            Password = PASSWORD,
            UserAttributes = [
                {
                    'Name': 'email',
                    'Value': ''
                }
            ]
        )
        response = cognito.admin_confirm_sign_up(
            UserPoolId = USERPOOLID,
            Username = NAME
        )

    def create_group(cognito, iam_role_arn):
        response = cognito.create_group(
            GroupName = NAME,
            UserPoolId = USERPOOLID,
            RoleArn = iam_role_arn
        )

    def add_user_to_group(cognito):
        response = cognito.admin_add_user_to_group(
            UserPoolId = USERPOOLID,
            Username = NAME,
            GroupName = NAME
        )

    # Initialization
    cognito = boto3.client('cognito-idp')
    # Create IAM Role
    iam_role_arn = create_iam_role()
    # Create AWS Cognito User
    create_user(cognito)
    # Create AWS Cognito Group
    create_group(cognito, iam_role_arn)
    # Make AWS Cognito User join into AWS Cognito Group
    add_user_to_group(cognito) 

if __name__ == '__main__':
    create_environment()

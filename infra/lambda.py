#!/usr/bin/env python3

import boto3

def create_user(cognito, userpoolid, clientid, username, password):
    response = cognito.sign_up(
        ClientId = clientid,
        Username = username,
        Password = password,
        UserAttributes = [
            {
                'Name': 'email',
                'Value': ''
            }
        ]
    )
    response = cognito.admin_confirm_sign_up(
        UserPoolId = userpoolid,
        Username = username
    )

def create_group(cognito, userpoolid, groupname):
    response = cognito.create_group(
        GroupName = groupname,
        UserPoolId = userpoolid,
        RoleArn = 'arn:aws:iam::002310297599:role/cognitoS3-S3AccessRole-1IM2MV67OURB5'
    )

def add_user_to_group(cognito, userpoolid, name):
    response = cognito.admin_add_user_to_group(
        UserPoolId = userpoolid,
        Username = name,
        GroupName = name
    )

if __name__ == '__main__':
    userpoolid = ''
    clientid = ''
    name = ''
    password = ''

    cognito = boto3.client('cognito-idp')
    create_user(cognito, userpoolid, clientid, name, password)
    create_group(cognito, userpoolid, name)
    add_user_to_group(cognito, userpoolid, name) 

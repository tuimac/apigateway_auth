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

if __name__ == '__main__':
    userpoolid = ''
    clientid = ''
    username = 'test'
    password = 'P@ssw0rd'

    cognito = boto3.client('cognito-idp')
    create_user(cognito, userpoolid, clientid, username, password)    

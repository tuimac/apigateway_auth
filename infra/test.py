#!/usr/bin/env python3

import boto3

def create_user(cognito, userpoolid, username, password):
    response = cognito.admin_create_user(
        UserPoolId = userpoolid,
        Username = username,
        TemporaryPassword = password,
    )

if __name__ == '__main__':
    userpoolid = ''
    username = 'test'
    password = 'P@ssw0rd'

    cognito = boto3.client('cognito-idp')
    create_user(userpoolid, username, password)    

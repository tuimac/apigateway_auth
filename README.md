# Access S3 with cognito authentication
Implementation of cognito authentication infrastructure and try to access with the token from AWS cognito.

## Cognito Infrastructure
That infrastructure is created by cloudformation. You have to be careful of creating cognito UserPool. If you want to create UserPool as a username and password authentication infrastructure, you set `false` to [UserPoolClient] - [GenerateSecret]. Because, you set `true`, you can't authenticate from browser.(I don't know exactly why...)

```
aws cloudformation create-stack --stack-name cognitoS3 --region <Your region code> --capabilities CAPABILITY_NAMED_IAM --template-body file://infra/template.yml
```

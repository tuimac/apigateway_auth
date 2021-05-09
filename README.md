# Access S3 with cognito authentication
Implementation of cognito authentication infrastructure and try to access with the token from AWS cognito.

## How to use
This is the procedure for trying to run the cognito application.

### 1. Build Cognito Infrastructure
That infrastructure is created by cloudformation. You have to be careful of creating cognito UserPool. If you want to create UserPool as a username and password authentication infrastructure, you set `false` to [UserPoolClient] - [GenerateSecret]. Because, you set `true`, you can't authenticate from browser.(I don't know exactly why...)

```
aws cloudformation create-stack --stack-name cognitoS3 --region <Your region code> --capabilities CAPABILITY_NAMED_IAM --template-body file://infra/template.yml
```
**<Architecture is created by template.yml>**
<br/>
![cognito_s3_cloudformation](https://user-images.githubusercontent.com/18078024/117558493-ee18b600-b0b8-11eb-9678-d2860cf7c7f1.png)

### 2. Start application
This application is created by React run on Docker. First thing first, you need to install Docker on your machine or server. I prepare the script is auto docker build and run container is `docker/run.sh`. Run command below.
```
./run.sh create
```

### 3. Get IDs from Cognito Resource
You log into that docker container like this.
```
docker exec -it cognito bash
```
If you run the application of cognito authentication, you need three IDs like User Pool ID, Application Client ID, Identity Provider ID. So you run this script `script/getCognitoInfo.sh` in this repository.<br/>
This script require `jq`command and IAM policy authorizations are `cognito-identity:*`,  `cognito-idp:*`.<br/>

![getCognitoInfo](https://user-images.githubusercontent.com/18078024/117558973-57e68f00-b0bc-11eb-81dc-ebd490f913bf.png)

Then you can access to `http://localhost/`. Have fun!

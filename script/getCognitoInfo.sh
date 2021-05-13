#!/bin/bash

TARGETFILE='../src/src/environment.js'
ENVFILE='setEnv.sh'
REGION='ap-northeast-1'
BUCKETNAME='cognito-s3-000'

cd $(dirname $0)
USERPOOLID=`aws cognito-idp list-user-pools --max-results 20 | jq -r '.UserPools[] | select(.Name == "cognitoS3") | .Id'` 
if [ -z $USERPOOLID ]; then
    echo 'There is no User Pool ID'
    exit 1
fi
CLIENTID=`aws cognito-idp list-user-pool-clients --user-pool-id $USERPOOLID --max-result 20 | jq -r '.UserPoolClients[] | select(.ClientName == "cognitoS3") | .ClientId'`
IDPID=`aws cognito-identity list-identity-pools --max-results 20 | jq -r '.IdentityPools[] | select(.IdentityPoolName == "cognitoS3") | .IdentityPoolId'`

sed -i "s/export const USER_POOL_ID = \'.*\'/export const USER_POOL_ID = \'$USERPOOLID\'/g" $TARGETFILE
sed -i "s/export const APP_CLIENT_ID = \'.*\'/export const APP_CLIENT_ID = \'$CLIENTID\'/g" $TARGETFILE
sed -i "s/export const REGION = \'.*\'/export const REGION = \'$REGION\'/g" $TARGETFILE
sed -i "s/export const ID_PROVIDER_ID = \'.*\'/export const ID_PROVIDER_ID = \'$IDPID\'/g" $TARGETFILE
sed -i "s/export const BUCKET_NAME = \'.*\'/export const BUCKET_NAME = \'$BUCKETNAME\'/g" $TARGETFILE
sed -i "s/export const USERNAME_KEY = \'.*\'/export const USERNAME_KEY = \'cognito-username\'/g" $TARGETFILE



sed -i "s/export USER_POOL_ID = \'.*\'/export USER_POOL_ID = \'${USERPOOLID}\'/g" $ENVFILE
sed -i "s/export APP_CLIENT_ID = \'.*\'/export APP_CLIENT_ID = \'${CLIENTID}\'/g" $ENVFILE
sed -i "s/export ID_PROVIDER_ID = \'.*\'/export ID_PROVIDER_ID = \'${IDPID}\'/g" $ENVFILE
sed -i "s/export USER_NAME = \'.*\'/export USERNAME = \'tuimac.devadm01@gmail.com\'/g" $ENVFILE
sed -i "s/export BUCKET_NAME = \'.*\'/export BUCKET_NAME = \'$BUCEKTNAME\'/g" $ENVFILE
sed -i "s/export USER_NAME_PREFIX = \'.*\'/export USER_NAME_PREFIX = \'cognitoS3-UserPool-Group\'/g" $ENVFILE

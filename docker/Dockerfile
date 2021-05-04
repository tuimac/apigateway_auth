FROM alpine:latest

WORKDIR /root

ADD entrypoint.sh /root/entrypoint.sh

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git icu-dev icu-libs vim nodejs nodejs-npm curl jq tree ncurses python3 py3-pip && \
    pip3 install awscli && \
    mkdir /etc/vim/backup && \
    mkdir /etc/vim/undo && \
    rm /etc/vim/vimrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/vim/vimrc -o /etc/vim/vimrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/linux/bashrc/.bashrc_node_docker -o /root/.bashrc && \
    git clone https://github.com/tuimac/cognito_s3 && \
    cd /root/cognito_s3 && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/git/hook/cognito_s3/pre-commit -o .git/hooks/pre-commit && \
    git config --global user.email "tuimac.devadm01@gmail.com" && \
    git config --global user.name "tuimac" && \
    cd src && \
    npm install amazon-cognito-identity-js bootstrap react-router-dom aws-sdk

ENTRYPOINT ["/root/entrypoint.sh"]

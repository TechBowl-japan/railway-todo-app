FROM node:20.11.0

# install basic package
RUN apt-get update && \
  apt-get install -y git curl make

# git secrets
RUN git clone https://github.com/awslabs/git-secrets.git && cd git-secrets && make install && cd .. && rm -rf git-secrets

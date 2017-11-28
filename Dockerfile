FROM node:boron-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk update && \
    apk upgrade && \
    apk add git openssh-client
    
# Install app dependencies
COPY package.json .

#EVIL EVIL hack to get ssh key for private gitlab dependencies
COPY id_rsa /root/.ssh/id_rsa
COPY id_rsa.pub /root/.ssh/id_rsa.pub
RUN chmod 400 /root/.ssh/id_rsa && chmod 400 /root/.ssh/id_rsa.pub
RUN ssh-keyscan gitlab.aws.warnerbros.com > /root/.ssh/known_hosts
RUN eval $(ssh-agent)

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
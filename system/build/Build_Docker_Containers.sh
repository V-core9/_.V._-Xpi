 #!/bin/bash
# Name: Docker.containers
# Description: Build docker containers, and stop the afterwards....
# Author: [_.V._] 
# Date: 20210611.05:44
# From Node File >>  "_build_containers": " docker-compose up -d ; docker stop $(docker ps -aq) ; ",
echo " "
echo "*********************************************"
echo "|| V._.XrOm-API DOCKER Containers Build "
echo "*********************************************"
echo " "
sleep 2s

WRKDIR=$PWD
echo $WRKDIR
echo " "

#  "_build_containers": " docker-compose up -d ; docker stop $(docker ps -aq) ; ",

echo $( docker-compose up -d )
ehoc $( docker stop $(docker ps -aq) ) 

sleep 1s
echo " "
echo "*********************************************"
echo "|| V._.XrOm-API  DOCKER Containers Build - FINISHED"
echo "*********************************************"
echo " "
sleep 2s

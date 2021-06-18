 #!/bin/bash
# Name: Docker.containers.CreateFolderStructure
# Description: Build docker containers, and stop the afterwards....
# Author: [_.V._] 
# Date: 20210611.05:44
# From Node File >>  "_create_folders": " bash -c \" cd system ; mkdir certs ; mkdir certs-data ; mkdir logs ; cd .. ; mkdir  mysql ; cp -r SOURCE PUBLIC ; cp 'system/build/buildAPI.sh' 'PUBLIC/' \" ; ",
echo " "
echo "*********************************************"
echo "|| V._.XrOm-API DOCKER Containers CreateFolderStructure "
echo "*********************************************"
echo " "

cd system 
echo $PWD
mkdir certs 
ls -l
mkdir certs-data 
ls -l
mkdir logs 
ls -l
cd .. 
echo $PWD
mkdir  mysql 
ls -l
cp -r SOURCE PUBLIC 
cp './system/build/buildAPI.sh' './PUBLIC/'
cp './system/config/env/.env_DevSample' './PUBLIC/.env'
cp './system/config/env/.env_DevSample' './.env'
cp './system/config/htaccess/.htaccess_DevSample' './PUBLIC/.htaccess'

echo " "
echo "*********************************************"
echo "|| V._.XrOm-API  DOCKER Containers CreateFolderStructure - FINISHED"
echo "*********************************************"
echo " "
sleep 1s

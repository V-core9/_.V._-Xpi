#!/bin/bash
# Name: Global.Node.Install
# Description: Will download, unzip and setup Xampp to be used as a server by our program
# Author: [_.V._] 
# Date: 20210611.05:44
# From Node File >>  bash -c \" npm install -g fast-cli open-cli systeminfo node-notifier-cli node-notifier \"
echo " "
echo "*********************************************"
echo "|| V._.XrOm-API Node Globals STARTING Install"
echo "*********************************************"
echo " "
sleep 2s

WRKDIR=$PWD
echo $WRKDIR
echo " "

# bash -c \" npm install -g fast-cli open-cli systeminfo node-notifier-cli node-notifier \" 

FILENAME="./system/config/NODE.js-Globals.Vinf"
LINES=$(cat $FILENAME)

for LINE in $LINES; do echo $(npm install -g $LINE); done

sleep 1s
echo " "
echo "*********************************************"
echo "|| V._.XrOm-API Node Globals FINISHED Install"
echo "*********************************************"
echo " "
sleep 2s

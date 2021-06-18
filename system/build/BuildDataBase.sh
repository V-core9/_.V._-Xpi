 #!/bin/bash
# Name: BuildDataBase.sh
# Description: Build mysql database.
# Author: [_.V._] 
# Date: 20210611.05:44
# THIS NEEDS FIXING SO IT ACTUALLY WORKS BY USIG THE FILES NOT LIKE THIS....
echo " "
echo "*********************************************"
echo "|| V._.nPI BuildDataBase.sh "
echo "*********************************************"
echo " "
sleep 2s

WRKDIR=$PWD
echo $WRKDIR
echo " "

# THIS NEEDS FIXING SO IT ACTUALLY WORKS BY USIG THE FILES NOT LIKE THIS....
mysql -u root -p v_pi_db --password=password -e "CREATE TABLE users ( id bigint NOT NULL AUTO_INCREMENT, username varchar(255) NULL UNIQUE, firstname varchar(255) NOT NULL, lastname varchar(255) NOT NULL, email varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, main_color varchar(255) NULL, user_type varchar(255) NULL, created datetime  DEFAULT CURRENT_TIMESTAMP NOT NULL, modified timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id))"
echo $( docker-compose up -d )

sleep 1s
echo " "
echo "*********************************************"
echo "|| V._.nPI  BuildDataBase.sh - FINISHED"
echo "*********************************************"
echo " "
sleep 2s

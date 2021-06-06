STATUS="NO";
PHPV=$(echo $(php -v) | cut -c5);
PHPVm=$(echo $(php -v) | cut -c7);

if [[ $PHPV -gt 6 ]] && [[ $PHPVm -gt 2 ]]; then  
    echo "[_.PHP Version OK._]";
    STATUS="OK";
else 
    echo "[_ERR_.PHP Version ERROR._ERR_]" ; 
    echo "Minimal PHP Version NEEDED is 7.3.xx. Try again after upgrade!" ;
fi ; 

OKSTATUS="OK";
echo $OKSTATUS;
echo $STATUS;

if [ "$STATUS" == "OK" ]; then  
    echo "-<]so|_.XOm_v1._|so[>-" ;
    echo "";
    echo "XOm_v1-Root npm install";
    npm install ;
    echo "DONE XOm_v1-Root npm install" ;
    echo "" ;
    echo "NPM Assets XOm_v1" ;
    cd app ;
    cd assets ;
    npm install ;
    echo "DONE NPM Assets XOm_v1 >> npm install in app/assets/" ;
    echo "" ;
    echo "COMPOSER for API" ;
    cd .. ;
    cd .. ;
    cd api ;
    cd included_files ;
    composer install ;
    echo "DONE INSTALL COMPOSER in api/included_files"
    echo ""
    echo "Now just setup DB, move relative urls in html...maybe even few more...don't remember."
    echo ""
else
    echo ""
    echo "ERRORSSSSSSSSSS"
    echo ""
fi;


echo "Exiting in (15s)...............";
sleep 5;
echo "Exiting in (10s)..........";
sleep 5;
echo "Exiting in (5s).....";
sleep 5;
echo "-<]eo|_.XOm_v1._|eo[>-";
sleep 1

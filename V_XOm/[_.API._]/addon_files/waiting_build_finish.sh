#!/usr/bin/env bash
until $(curl --output /dev/null --silent --head --fail http://localhost:404/index.php); do
    printf '.'
    sleep 5
done

docker exec -it DemoName_xom bash -c " bash -c \"/var/www/html/buildAPI.sh\" ; sleep 2; echo ""; echo \"Done Setting Up PHP \" ; exit 0 ;"
#!/usr/bin/env bash
until $(curl --output /dev/null --silent --head --fail http://localhost:4040/index.php); do
    printf '.'
    sleep 5
done

docker exec -it VnPI_v_pi bash -c " bash -c \"/var/www/html/buildAPI.sh\" ; sleep 2; echo ""; echo \"Done Setting Up PHP \" ; exit 0 ;"

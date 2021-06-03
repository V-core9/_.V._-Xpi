#!/usr/bin/env bash
until $(curl --output /dev/null --silent --head --fail http://localhost:404/index.php); do
    printf '.'
    sleep 5
done

bash buildAPI.sh | docker exec -it DemoName_xom bash
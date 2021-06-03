#!/usr/bin/env bash
until $(curl --output /dev/null --silent --head --fail http://localhost:404/sys-info_test.php); do
    printf '.'
    sleep 5
done
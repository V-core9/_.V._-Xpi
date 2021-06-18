echo "-<]so|_.V_nPI--:.V.:--[_.API._]._|so[>-"
sleep 1
echo "."
sleep 1
echo "Starting API Build Process"
sleep 1
docker-php-ext-install pdo pdo_mysql pdo_pgsql
sleep 1
echo "IN DOCKER V_nPI >>"
apt-get update -y
apt-get install -y python
sleep 5
echo "<< DOCKER V_nPI >>"
sleep 5

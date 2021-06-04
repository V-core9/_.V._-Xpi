echo "Starting API Build Process"   
bash -c "docker-php-ext-install pdo pdo_mysql pdo_pgsql" 
bash -c "apt-get update -y  "   
bash -c "docker restart DemoName_xom"
exit 0
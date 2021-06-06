# V_XOm

Docker/xampp portable, Nginx, PHP-7.4-FPM, MySQL, phpMyAdmin, JWT, PWA,...

_!.!_[NOTE:>> MOVED README TO BE GENERATED LATER FROM CUSTOM FILES THAT ARE ACTUALLY JSON ]_!.!_
.....Look for _xInf file in any folder and it can contain usefull data like what to run and do...




# XOm_v2.api    by ⩤⮓᚜⩔≜⧌᚛⮒⩥

Easy-build using only 1 command: 
    
    npm run b__  
    
This will get you set with docker containers for:
 - [PHP7.4-FPM](PHP7.4-FPM/)
 - [Nginx](https://www.nginx.com/)
 - [mariadb](https://mariadb.org/)
 - [phpMyAdmin](https://www.phpmyadmin.net/)
 - [backUpTool](https://github.com/fradelg/docker-mysql-cron-backup)
 
Stop and remove/Clean project :

    npm run sc_
    
---   
## Additional Information: 
   
Project folders:   
- [system]   
- [config]   
- [source]   

Additional files:   
- [ReadMe.md](https://github.com/MyUserNameIsMyUserName/XOmega.git/blob/main_index/system/README.md)   
- [Licence](https://github.com/MyUserNameIsMyUserName/XOmega.git/blob/main_index/system/LICENSE)   
    
_Just trying to keep the root folder clear of most of the stuff_ 




> ## **WDNPMP** - WordPress/Docker/Nginx/PHP-FPM/MySQL/phpMyAdmin [TEMPLATE]
>
> ### Docker WordPress Nginx Php-FPM phpMyAdmin
>
> ---

---

## 1. Requirements:

    1. Node.js    [ root/ package.json ]        [>  Basically can be used for many things, here is just building project for now....will be adding stuff to it. <]
    2. Docker     [ root/ docker-compose.yml ]  [>  Well...the running engine config file <]
    3. shell/bash [ .sh ]                       [>  Runs parts of scripts from package.json as bash, while having a .sh file to stop and clean  <]
    4. enviorment [ .env ]                      [>  Well contains settings for the exact website we are developing....so this is per website basis  <]

---

## 2. Available Node Commands :

1.  Test  
    **Description:** Still empty...

                "test": " echo \"Error: no test specified\" && exit 1 ",

2.  \_create_folders  
    **Description:** Feel free to fill in and help out with these, next people joining can continue the work easier and even faster fill in these.

            "_create_folders": " bash -c \" cd system ; mkdir certs ; mkdir certs-data ; mkdir logs ; cd .. ; mkdir  mysql ; mkdir PUBLIC ; \" ",

3.  \_build_containers  
    **Description:** Building containers

            "_build_containers": " docker-compose up -d ",

4.  \_stop_and_clean  
    **Description:** Same as title say/

            "_stop_and_clean": " bash ./system/stop_and_clean.sh ",

5.  \_build  
    **Description:** Creates folders and containers.

            "_build": " bash -c \" npm run _create_folders ; npm run _build_containers \" ",

---

## Some alt-name commands [shortcodes]:

1.  bc\_  
    **Description:** Building containers

            "bc_": " npm run _build_containers ",

2.  sc\_  
    **Description:** Still empty...

            "sc_": " npm run _stop_and_clean ",

3.  ysc\_  
    **Description:** Stop&Clean but with skiping asking for approval to clear project.

            "ysc_": "  bash -c \"echo y|npm run _stop_and_clean \" ",

4.  b\_\_  
    **Description:** Still empty...

            "b__": " npm run _build ",

5.  \_o\_  
    **Description:** Runs fast clean and build of everything, folders, containers, db.

            "_o_": " bash -c \" npm run ysc_ ; npm run b__ \" "

---



REFERENCE:
  https://github.com/fradelg/docker-mysql-cron-backup

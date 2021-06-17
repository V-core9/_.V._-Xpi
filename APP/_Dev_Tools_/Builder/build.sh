#!/bin/bash
#╔═══════════════════════════════════════════════════════════════════════════════╗
#║ ♠ File Name: build.sh                                                         ║
#║ ↔ Location: <: public_root :>/ Dev / sh / build.sh                            ║
#║ Σ Description:                                                                ║
#║     → In case this lives more than few days, better have something prepared   ║
#╟       than few days, better have something prepared have as   ╔═══════════════╣
#║       than few days, better have something prepared.          ║ √ 23.01.2021. ║
#╚═══════════════════════════════════════════════════════════════╩═══════════════╝

if [ "$1" == "" ] || [ $# -gt 1 ]; then
    clear

    echo "A^O_DOCS_BUILD_PROCESS > > > starting...."
    echo 
    echo "++{ Use [ctr+c] to stop at any time }++"
    echo "-------------------------------------------------"
    #echo "|    PRESS [> ENTER <] to Start Building.       |"
    #read -p "-------------------------------------------------"
    
    echo "Trying to remove PUBLIC folders contents [if there is any]"
    rm -r PUBLIC/*

    echo "MAKING >> PUBLIC dir"
    mkdir PUBLIC

    echo "COPYING >>  from:[./SOURCE/static] To:[./PUBLIC]"
    cp -r SOURCE/static/* PUBLIC  

    echo "EXPORTING >> all SCSS files from src to public"
    node-sass -r SOURCE/app/ -o PUBLIC/ --output-style compressed

    echo "MAKING >> Staging Folder inside Public dir."
    mkdir PUBLIC/build_staging

    echo "Now Exporting JS files using BABEL [with remove-comments plugin]"
    npx babel SOURCE/app/ --out-dir PUBLIC/build_staging/ --source-maps --plugins remove-comments --ignore "src/assets/**/*"

    echo "Now Exporting JS files using BABEL [MINIFY separate run]"
    minify PUBLIC/build_staging/ --out-dir PUBLIC/ --mangle.keepClassName

    echo "REMOVING >> Staging Folder inside Public dir."
    rm -r PUBLIC/build_staging

    echo "REMOVING >> ALL images from Public dir."
    echo "REMOVING >>  BMP A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.bmp
    rm -r PUBLIC/assets/img/*.bmp
    echo "REMOVING >>  JPG A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.jpg
    rm -r PUBLIC/assets/img/*.jpg
    echo "REMOVING >>  JPEG A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.jpeg
    rm -r PUBLIC/assets/img/*.jpeg
    echo "REMOVING >>  SVG A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.svg
    rm -r PUBLIC/assets/img/*.svg
    echo "REMOVING >>  PNG A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.png
    rm -r PUBLIC/assets/img/*.png
    echo "REMOVING >>  GIF A^O_DOCSBuild press: [enter]"
    #read -p "REMOVING >>  GIF A^O_DOCSBuild press: [enter]"
    rm -r PUBLIC/assets/*.gif
    rm -r PUBLIC/assets/img/*.gif

    echo "COMPRESSING >> ALL images from SOURCE dir into PUBLIC dir."
    imagemin SOURCE/static/assets/img/* --plugin.pngquant.quality:[0.9, 1] --out-dir=PUBLIC/assets/img
    
    sleep 2
    #read -p "To EXIT A^O_DOCSBuild press: [enter]"

else 
    echo "Starting A^O_DOCS DEVELOPMENT Build."
    
    
    echo "Trying to remove PUBLIC folders contents [if there is any]"
    rm -r PUBLIC/*

    echo "MAKING >> PUBLIC dir"
    mkdir PUBLIC

    echo "COPYING >>  from:[./SOURCE/static] To:[./PUBLIC]"
    cp -r SOURCE/static/* PUBLIC  

    echo "EXPORTING >> all SCSS files from src to public"
    node-sass -r SOURCE/app/ -o PUBLIC/ --output-style compressed

    echo "MAKING >> Staging Folder inside Public dir."
    mkdir PUBLIC/build_staging

    echo "Now Exporting JS files using BABEL [with remove-comments plugin]"
    npx babel SOURCE/app/ --out-dir PUBLIC/build_staging/ --source-maps --plugins remove-comments --ignore "src/assets/**/*"

    echo "Now Exporting JS files using BABEL [MINIFY separate run]"
    minify PUBLIC/build_staging/ --out-dir PUBLIC/ --mangle.keepClassName

    echo "REMOVING >> Staging Folder inside Public dir."
    rm -r PUBLIC/build_staging
    
    echo ">> DEV_SKIP >>-[ COMPRESSING >> ALL images from SOURCE dir into PUBLIC dir. ]-"
    #read -p "To EXIT A^O_DOCSBuild press: [enter]"

    sleep 2
    #exit

fi

#▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#▌   ! END OF FILE !            ▐▀▀▀         ▐▀▀▀             ! END OF FILE !    ▐
#▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄      ▐▀▀▀  ▐▀▀▀▀▌ ▐▀▀▀         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▐
#▌ ♠ File Name: build.sh ▐      ▐▄▄▄  ▐▄▄▄▄▌ ▐            ▌  ☺ Author: Slavko V. ▐
#▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
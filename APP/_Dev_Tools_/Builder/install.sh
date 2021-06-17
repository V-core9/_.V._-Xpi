#!/bin/bash
#╔═══════════════════════════════════════════════════════════════════════════════╗
#║ ♠ File Name: install.sh                                                       ║
#║ ↔ Location: <: public_root :>/ Dev / sh / install.sh                          ║
#║ Σ Description:                                                                ║
#║     → Well this is basically easy way to sort out installation of global      ║
#╟       node dependencies, while alse alloing us to set more    ╔═══════════════╣
#║       then just dependencies...free to play with bash.        ║ √ 18.03.2021. ║
#╚═══════════════════════════════════════════════════════════════╩═══════════════╝

echo "[> SOF::A^O__INSTALL_Process <]"

echo "Starting NPM instal"
npm install
echo "Done NPM install."

echo "Starting node-sass instal"
npm install -g node-sass
echo "Done node-sass install."

echo "Starting Nodemon install"
npm install -g nodemon
echo "Done NPM Nodemon install."

echo "Starting babel/core & babel/cli install"
npm install -g @babel/core @babel/cli
echo "Done NPM babel/core & babel/cli install."

echo "Starting babel-minify install"
npm install -g babel-minify
echo "Done NPM babel-minify install."

echo "Starting localtunnel install"
npm install -g localtunnel
echo "Done NPM localtunnel install"

echo "Starting node-compress-images-cli install"
npm install -g image-2-min
npm install --global imagemin-cli
echo "Done NPM node-compress-images-cli install."

echo "Starting pngquant-bin install"
npm install -g imagemin-pngquant
npm install -g pngquant-bin
npm install -g gifsicle
echo "Done NPM pngquant-bin install."

read -p "[> EOF::A^O__INSTALL_Process >> Press {enter} to exit...<]"


#▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
#▌   ! END OF FILE !              ▐▀▀▀         ▐▀▀▀             ! END OF FILE !    ▐
#▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄      ▐▀▀▀  ▐▀▀▀▀▌ ▐▀▀▀         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▐
#▌ ♠ File Name: install.sh ▐      ▐▄▄▄  ▐▄▄▄▄▌ ▐            ▌  ☺ Author: Slavko V. ▐
#▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
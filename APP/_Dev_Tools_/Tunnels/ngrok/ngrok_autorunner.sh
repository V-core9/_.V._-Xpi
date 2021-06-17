#!/bin/bash
#
###################
#-----------------#
# Made by NullDev #
#-----------------#
###################

###################
#-----------------#
#   NGROK  PATH   #
#-----------------#
###################
NG=Dev_Tools/ngrok
#-----------------#
###################

###################
#-----------------#
#  PORT TO OPEN   #
#-----------------#
###################
PT=7744
#-----------------#
###################
#echo $PWD
RAW=null
API=null
FST=null
LNK_HTTP=.
LNK_HTTPS=.
sq='"'
lnpref=public_url
prefix="${lnpref}:"
tnl='localhost:4040/api/tunnels'
#COL
C_RED=$(tput setaf 1)
C_GRN=$(tput setaf 2)
C_YLW=$(tput setaf 3)
C_BLE=$(tput setaf 4)
C_RST=$(tput sgr0)
function cls {
	printf "\033c" 
	printf "\e[5t" 
}
function logo {
	printf "\n\n\n"
	printf "    ╔╗╔╔═╗╦═╗╔═╗╦╔═  ┌─┐┌┬┐┌─┐┬─┐┌┬┐┌─┐┬─┐\n"
	printf "    ║║║║ ╦╠╦╝║ ║╠╩╗  └─┐ │ ├─┤├┬┘ │ ├┤ ├┬┘\n"
	printf "    ╝╚╝╚═╝╩╚═╚═╝╩ ╩  └─┘ ┴ ┴ ┴┴└─ ┴ └─┘┴└─\n"
	printf "    By YEAAA_DUDE"
	printf "\n\n\n"
	printf " Loading...\n\n\n"
}
cls
logo
pkill -f ngrok
EXEC=$($NG http $PT >> /dev/null &)
sleep 5s
if ! [ -x "$(command -v curl)" ]; then
	unset API
	API=$(wget -qO - $tnl | awk -F"," -v k=$lnpref '{
		gsub(/{|}/,"")
		for(i=1;i<=NF;i++){
			if ( $i ~ k ){ printf "${i}" }
		}
	}')
else
	unset API
	API=$(curl -s $tnl | awk -F"," -v k=$lnpref '{
		gsub(/{|}/,"")
		for(i=1;i<=NF;i++){
			if ( $i ~ k ){ print $i }
		}
	}')
fi
API=${API//$sq}
API=${API//$prefix}
IFS=$'\n' read -rd '' -a FST <<<"$API"
FST=${FST//http\:\/\/}
sleep 1s
LNK_HTTP="${FST}"
LNK_HTTPS="${FST}"
printf " Status: ${C_GRN}ONLINE\n\n"
printf " Link (HTTP):  ${LNK_HTTP}\n"
printf " Link (HTTPS): ${LNK_HTTPS}\n"
printf "\n Press [ENTER] to leave..."
printf "\n\n\n"

echo "${LNK_HTTP}" > ./Dev_Tools/ngrok_live.txt
echo "${LNK_HTTPS}" >> ./Dev_Tools/ngrok_live.txt

read -p " "
exit 0
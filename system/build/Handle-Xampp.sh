# Name: Xampp.Download.Unzip.Setup 
# Description: Will download, unzip and setup Xampp to be used as a server by our program
# Author: [_.V._] 
# Date: 20210611.05:44
# From Node File >>  "_get_xampp": " bash -c \" npm run _download_xampp ; npm run _unzip_xampp ; \" ",

echo "Welcome....Setting Up Xampp..."
# From Node File >>  "_download_xampp": " bash -c \" curl https://deac-riga.dl.sourceforge.net/project/xampp/XAMPP%20Windows/7.4.19/xampp-portable-windows-x64-7.4.19-0-VC15.zip --output xampp-portable-windows-x64-7.4.19-0-VC15.zip  \" ",
bash -c \" curl https://deac-riga.dl.sourceforge.net/project/xampp/XAMPP%20Windows/7.4.19/xampp-portable-windows-x64-7.4.19-0-VC15.zip --output xampp-portable-windows-x64-7.4.19-0-VC15.zip  \" 
 
# From Node File >>  "_unzip_xampp": " bash -c \" unzip xampp-portable-windows-x64-7.4.19-0-VC15.zip -d xamppPW64-7.4.19  \" ",
bash -c \" unzip xampp-portable-windows-x64-7.4.19-0-VC15.zip -d xamppPW64-7.4.19  \" ;

# From Node File >>  "_run_setup_xampp": "bash -c \" echo 'YEAAA' | cmd.exe /c setup_xampp.bat \" ; ",
bash -c \" echo 'YEAAA' | cmd.exe /c setup_xampp.bat \" ;

# EOFile
echo "Hopefully all went well. Bye..."
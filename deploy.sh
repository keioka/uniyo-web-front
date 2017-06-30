npm run build
ZIP=-9 tar -zcvf package.tar.gz index.html public
scp ./package.tar.gz ubuntu@frontend.uniyo.io:~

ssh ubuntu@frontend.uniyo.io << EOF
  cd /srv/www/
  sudo mkdir uniyo_new_deploy
  cd uniyo_new_deploy
  sudo mv ~/package.tar.gz .
  sudo tar -zxvf ./package.tar.gz
  sudo rm ./package.tar.gz
  cd ..
  sudo rm -Rf uniyo_old_deploy
  sudo mv uniyo uniyo_old_deploy
  sudo mv uniyo_new_deploy uniyo
EOF

rm ./package.tar.gz

npm run build
ZIP=-9 tar -zcvf staging-package.tar.gz index.html public
scp ./staging-package.tar.gz ubuntu@frontend.uniyo.io:~

ssh ubuntu@frontend.uniyo.io << EOF
  cd /srv/www/
  sudo mkdir staging_uniyo_new_deploy
  cd staging_uniyo_new_deploy
  sudo mv ~/staging-package.tar.gz .
  sudo tar -zxvf ./staging-package.tar.gz
  sudo rm ./staging-package.tar.gz
  cd ..
  sudo rm -Rf staging_uniyo_old_deploy
  sudo mv staging_uniyo staging_uniyo_old_deploy
  sudo mv staging_uniyo_new_deploy staging_uniyo
EOF

rm ./staging-package.tar.gz

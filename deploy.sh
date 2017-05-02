npm run build
ZIP=-9 tar -zcvf beta_package.tar.gz index.html public
scp ./beta_package.tar.gz ubuntu@54.208.126.174:~

ssh ubuntu@54.208.126.174 << EOF
  cd /srv/www/
  sudo mkdir uniyo_beta_new
  cd uniyo_beta_new
  sudo mv ~/beta_package.tar.gz .
  sudo tar -zxvf ./beta_package.tar.gz
  sudo rm ./beta_package.tar.gz
  cd ..
  sudo rm -Rf uniyo_beta_old
  sudo mv uniyo_beta uniyo_beta_old
  sudo mv uniyo_beta_new uniyo_beta
EOF

rm ./beta_package.tar.gz

git pull
npm install
npm run build-qa

now=`date +"%m-%d-%y-%H-%M-%S"`
echo $now
#Delete remote content before pushing new content.
ssh keerthi@pandu.aphetech.com "mv /opt/sites/ttrappqa /opt/sites/ttrappiqa-$now"

npm run deploy-qa

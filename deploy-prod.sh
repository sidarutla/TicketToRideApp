git pull
npm install
npm run build

now=`date +"%m-%d-%y-%H-%M-%S"`
echo $now
#Delete remote content before pushing new content.
ssh keerthi@pandu.aphetech.com "mv /opt/sites/ttrapp /opt/sites/ttrapp-$now"

npm run deploy

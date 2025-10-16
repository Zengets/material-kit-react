ssh root@47.111.101.227 "rm -rf /home/teach/*"
echo 'deleted /home/teach/*'
scp -r ./dist/* root@47.111.101.227:/home/teach/
echo 'sync complete'

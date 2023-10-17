#!/bin/bash


cd ~/wconnect/admin-plataform-api/

echo ORIENTATION_VIDEO=TEST >> .env
echo URL=URL_TEST >> .env

# echo 'STOP CONTAINERS'
# docker stop $(docker ps -a -q)

# echo 'REMOVE CONTAINERS'
# docker rm $(docker ps -a -q)

# echo 'REMOVE IMAGES'
# docker rmi jspereira/admin-token-api

# echo 'PULL IMAGES'
# docker pull jspereira/admin-token-api

# #local
# # docker build -t jspereira/admin-token-api .

# echo 'RUN CONTAINERS'
# docker run --name admin_token_api -p 80:80 -d jspereira/admin-token-api

# # (docker exec -i admin_token_api sh -c "cat > .env") < .env
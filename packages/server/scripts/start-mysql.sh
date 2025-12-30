#!/bin/bash

MYSQL_CONTAINER="reviews-mysql"
PHPMYADMIN_CONTAINER="reviews-phpmyadmin"

# Start MySQL container
if docker ps -a --format '{{.Names}}' | grep -q "^${MYSQL_CONTAINER}$"; then
  echo "✓ Starting existing MySQL container..."
  docker start $MYSQL_CONTAINER
else
  echo "✓ Creating new MySQL container..."
  docker run -d \
    --name $MYSQL_CONTAINER \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=rootpassword \
    -e MYSQL_DATABASE=reviews_db \
    -e MYSQL_USER=user \
    -e MYSQL_PASSWORD=password \
    -v mysql_data:/var/lib/mysql \
    mysql:8.0
fi



echo "✓ MySQL running on localhost:3306"
echo "✓ Data persisted in 'mysql_data' volume"
echo "✓ Use 'bunx prisma studio' to view/edit data"
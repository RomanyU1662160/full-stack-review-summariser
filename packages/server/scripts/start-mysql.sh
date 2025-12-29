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

# Start phpMyAdmin container
if docker ps -a --format '{{.Names}}' | grep -q "^${PHPMYADMIN_CONTAINER}$"; then
  echo "✓ Starting existing phpMyAdmin container..."
  docker start $PHPMYADMIN_CONTAINER
else
  echo "✓ Creating new phpMyAdmin container..."
  docker run -d \
    --name $PHPMYADMIN_CONTAINER \
    -p 8080:80 \
    --link $MYSQL_CONTAINER:db \
    -e PMA_HOST=db \
    -e PMA_USER=user \
    -e PMA_PASSWORD=password \
    phpmyadmin:latest
fi

echo "✓ MySQL running on localhost:3306"
echo "✓ phpMyAdmin running on http://localhost:8080"
echo "✓ Data persisted in 'mysql_data' volume"
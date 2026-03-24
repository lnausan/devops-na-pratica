#!/bin/bash
# deploy.sh — Script de deploy usando Docker
# Uso: ./scripts/deploy.sh [usuario-docker-hub]

set -e

DOCKERHUB_USER="${1:-lnausan}"
IMAGE_NAME="$DOCKERHUB_USER/devops-na-pratica"
CONTAINER_NAME="devops-na-pratica"

echo "Parando container anterior (se existir)..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "Baixando imagem mais recente..."
docker pull $IMAGE_NAME:latest

echo "Iniciando novo container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 3000:3000 \
  --restart unless-stopped \
  $IMAGE_NAME:latest

echo "Deploy concluido. Aplicacao disponivel em http://localhost:3000"

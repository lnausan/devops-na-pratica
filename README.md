# DevOps na Prática - API

API REST desenvolvida como projeto da disciplina **DevOps na Prática** da PUCRS Online.

## Tecnologias

- **Runtime:** Node.js 18
- **Framework:** Express.js
- **Testes:** Jest + Supertest
- **Linting:** ESLint
- **CI/CD:** GitHub Actions
- **Container:** Docker
- **IaC:** Terraform (AWS)

## Executar Localmente

```bash
npm install
npm start
```

## Testes

```bash
npm test
```

## Docker

```bash
docker build -t devops-api .
docker run -p 3000:3000 devops-api
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | / | Informações da API |
| GET | /health | Health check |
| GET | /api/items | Listar items |
| GET | /api/items/:id | Buscar item |
| POST | /api/items | Criar item |
| PUT | /api/items/:id | Atualizar item |
| DELETE | /api/items/:id | Deletar item |

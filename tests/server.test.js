const request = require('supertest');
const app = require('../src/server');

describe('Health Check', () => {
  test('GET /health deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('Rota Principal', () => {
  test('GET / deve retornar informacoes da API', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('DevOps na Pratica - API');
    expect(res.body.version).toBe('1.0.0');
    expect(res.body.endpoints).toContain('/health');
  });
});

describe('CRUD de Items', () => {
  test('GET /api/items deve retornar lista de items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/items/:id deve retornar item existente', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toHaveProperty('name');
  });

  test('GET /api/items/:id deve retornar 404 para item inexistente', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Item nao encontrado');
  });

  test('POST /api/items deve criar novo item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Novo Item', description: 'Descricao do novo item' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Novo Item');
    expect(res.body).toHaveProperty('id');
  });

  test('POST /api/items deve retornar 400 sem nome', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ description: 'Sem nome' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Nome e obrigatorio');
  });

  test('PUT /api/items/:id deve atualizar item', async () => {
    const res = await request(app)
      .put('/api/items/1')
      .send({ name: 'Item Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Item Atualizado');
  });

  test('PUT /api/items/:id deve retornar 404 para item inexistente', async () => {
    const res = await request(app)
      .put('/api/items/999')
      .send({ name: 'Nao existe' });
    expect(res.status).toBe(404);
  });

  test('DELETE /api/items/:id deve deletar item', async () => {
    const res = await request(app).delete('/api/items/2');
    expect(res.status).toBe(204);
  });

  test('DELETE /api/items/:id deve retornar 404 para item inexistente', async () => {
    const res = await request(app).delete('/api/items/999');
    expect(res.status).toBe(404);
  });
});

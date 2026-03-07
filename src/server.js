const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps na Pratica - API',
    version: '1.0.0',
    endpoints: ['/health', '/api/items']
  });
});

// CRUD simples em memória
let items = [
  { id: 1, name: 'Item 1', description: 'Primeiro item' },
  { id: 2, name: 'Item 2', description: 'Segundo item' }
];
let nextId = 3;

// Listar todos os items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Buscar item por ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item nao encontrado' });
  }
  res.json(item);
});

// Criar novo item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nome e obrigatorio' });
  }
  const item = { id: nextId++, name, description: description || '' };
  items.push(item);
  res.status(201).json(item);
});

// Atualizar item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item nao encontrado' });
  }
  const { name, description } = req.body;
  if (name) item.name = name;
  if (description !== undefined) item.description = description;
  res.json(item);
});

// Deletar item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item nao encontrado' });
  }
  items.splice(index, 1);
  res.status(204).send();
});

// Exporta app para testes
module.exports = app;

// Inicia servidor apenas se executado diretamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

## Desafio Técnico Full Stack Júnior

Esse projeto que desenvolvi foi para aplicação em uma vaga de Desenvolvedor Junior Cogna MArtech, eu aprendi muita coisa nesse desafio e vou pra cima para mais conhecimento

---

### Tecnologias Utilizadas

- **Backend**: Node.js, Express, PrismaORM, MongoDB, JWT
- **Frontend**: NestJS + Axios
- **Testes**: Jest, Supertest

---

### Como rodar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/luizndev/desafio-tecnico.git
cd desafio-tecnico
```

2. **Configuração do Backend:**

```bash
cd backend/api
npm install
```

3. **Configurar variáveis de ambiente:**
Crie um arquivo .env dentro da pasta backend/api com as seguintes variáveis:
```bash
DATABASE_URL="mongodb+srv://nome:senha@url/db?retryWrites=true&w=majority"
SECRET=""
```

4. **Iniciar o backend:**
```bash
npm run dev
```

---

### Configuração do front-end

Abra um novo terminal:
```bash
cd frontend/tasks
npm install
```

1. **Iniciar o frontend:**
```bash
npm run dev
```

---

### Rodando os testes

Para executar os testes do backend (rotas de registro, login, criação e conclusão de tarefas):
```bash
cd backend/api
npm test
```

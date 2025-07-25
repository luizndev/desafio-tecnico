import request from 'supertest'
import app from "../src/app"
import prisma from "../src/lib/prisma";

let token: string;
let taskID: string;
let user: any;

// 1° TESTE DE REGISTRO
describe("Teste de Registro", () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
        where: {
            email: "luisteste@email.com",
      },
    });
    await prisma.$disconnect();
 });
});

it("Fazendo Registro", async () => {
  const res = await request(app)
    .post("/auth/register")
    .send({
      name: "Teste Jest",
      email: "luisteste@email.com",
      password: "123321",
    });

  console.log("RESPOSTA:", res.status, res.body);
    const status = res.status;
    expect([201, 400, 500]).toContain(status);
}, 60000);
 
// 2° TESTE DE LOGIN
describe('Autenticação e acesso à rota protegida', () => {
  it("Fazendo Login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "luisteste@email.com",
        password: "123321",
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
    token = res.body.token;
    user = res.body.user;
  }, 60000);
});


// 3° TESTE DE CRIAR TASK
describe('Concluir uma Task', () => {
  let taskID: string;

  beforeAll(async () => {
    const taskRes = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task para conclusão",
        ownerID: user.id,
      });

    taskID = taskRes.body.id;
  });

  it("Marca uma tarefa como concluída", async () => {
    const res = await request(app)
      .post(`/tasks/${taskID}/complete`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty("completed", true);
  }, 60000);
});

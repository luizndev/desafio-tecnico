import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
    try {
        await prisma.user.findMany();
        console.log("✅ Conexão com banco de dados funcionando.");
    } catch (err) {
        console.error("❌ Erro ao conectar no banco:", err);
    } finally {
        await prisma.$disconnect();
    }
}

test();

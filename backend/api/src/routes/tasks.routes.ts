import { Router } from "express";
import prisma from "../lib/prisma";
import checkToken from "../lib/checkToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", checkToken, async (req, res) => {
    const alltasks = await prisma.task.findMany();
    res.json(alltasks);
});

router.patch("/:id/complete", checkToken, async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.update({
        where: { id },
        data: { status: "Completa" }
    }).then((updatedTask: any) => {
        res.json({ message: "Tarefa atualizada com sucesso", task: updatedTask });
    }).catch((error: any) => {
        console.error("Erro ao atualizar tarefa:", error);
    });
});

router.post("/", checkToken, async (req, res) => {
   const { title, ownerID } = req.body;
    if (!title || !ownerID) {
        return res.status(400).json({ error: "Título e ID do proprietário são obrigatórios." });
    }

    const verifyUser = await prisma.user.findUnique({
        where: { id: ownerID },
    });

    if (!verifyUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    console.log("Creating task for user:", verifyUser.name);
    const task = await prisma.task.create({
        data: { title, status: "A Fazer", ownerID, responsavel: verifyUser.name}
    })
    res.status(201).json(task);
});


export default router;


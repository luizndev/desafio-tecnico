import { Router } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
    console.log("PASSOU  AQUI 1")
    const { name, email, password } = req.body;
    try {
        console.log("PASSOU  AQUI 2")
        const verifyUser = await prisma.user.findMany({
            where: {
                email: email,
            },
        });
        console.log("PASSOU  AQUI 3")
        if(verifyUser  && verifyUser.length > 0) {
            return res.status(400).json({ error: "Usuário já cadastrado." });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ error: "Erro ao hashear a senha." });
        }
        
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        console.log("PASSOU  AQUI 4")
        console.log("User registered:", user);
        res.status(201).json(user);
    } catch (error: any) {
        console.log("PASSOU  AQUI 5")
        console.error("Erro ao registrar usuário:", error); 
        res.status(500).json({
            error: "Erro interno no servidor.",
            message: error.message,
            stack: error.stack,
        });
    }   
});

router.get("/register", async (req, res) => {
    res.json({ message: "Register endpoint is working!" });
});

export default router;


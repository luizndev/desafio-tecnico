import { Router } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {

        const verifyUser = await prisma.user.findMany({
            where: {
                email: email,
            },
        });

        if(!verifyUser) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }
        if (!email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        if(verifyUser){
            console.log(JSON.stringify(verifyUser[0]));
        }

        const checkSenha = await bcrypt.compare(password, verifyUser[0].password);
        if (!checkSenha) {
            return res.json({ error: "Senha incorreta" });
        }

        try{
            const secret = process.env.SECRET;
            if(!secret){
                return res.status(500).json({ error: "Erro interno no servidor, variável de ambiente SECRET não definida" });
            }

            const token = jwt.sign({ id: verifyUser[0].id }, secret);
            res.status(200).json({ token: token, user: verifyUser[0] });
        } catch (error) {
            console.error("Erro ao gerar token:", error);
            return res.status(500).json({ error: "Erro ao gerar token" });
        }
    } catch (error: any) {
        console.error("Erro ao registrar usuário:", error); 
        res.status(500).json({
            error: "Erro interno no servidor",
            message: error.message,
            stack: error.stack,
        });
    }   
});

router.get("/login", async (req, res) => {
    res.json({ message: "Login retornando ok!" });
});

export default router;


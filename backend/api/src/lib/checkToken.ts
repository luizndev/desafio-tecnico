import jwt from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({ error: "Erro interno no servidor, variável de ambiente SECRET não definida" });
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};
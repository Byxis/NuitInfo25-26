import { Router } from "express";
import pool from "../db/database.js";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../middleware/auth-admin.js";

const router = Router();

router.get("/me", async (req, res) => {
    const user = req.user;
    const { rows } = await pool.query(
        'SELECT id, login, role, has_finished_game1 as "hasFinishedGame1", has_finished_game2 as "hasFinishedGame2", has_finished_game3 as "hasFinishedGame3", has_finished_game4 as "hasFinishedGame4" FROM users WHERE id=$1',
        [user?.id]
    );
    res.json(rows[0]);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query(
        'SELECT id, login, role, has_finished_game1 as "hasFinishedGame1", has_finished_game2 as "hasFinishedGame2", has_finished_game3 as "hasFinishedGame3", has_finished_game4 as "hasFinishedGame4" FROM users WHERE id = $1',
        [id]
    );
    if (rows.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(rows[0]);
});

// Création d'un utilisateur
router.post("/", async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).json({ error: "Login et mot de passe requis" });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (login, password_hash) VALUES ($1, $2)",
            [login, hash]
        );
        res.status(201).json({ message: "Utilisateur créé" });
    } catch (err: any) {
        if (err.code === "23505") {
            res.status(409).json({ error: "Login déjà existant" });
        } else {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
});
// Liste de tous les utilisateurs (réservée aux admins)
router.get("/", async (_req, res) => {
    const { rows } = await pool.query(
        'SELECT id, login, role, has_finished_game1 as "hasFinishedGame1", has_finished_game2 as "hasFinishedGame2", has_finished_game3 as "hasFinishedGame3", has_finished_game4 as "hasFinishedGame4" FROM users ORDER BY id'
    );
    res.json(rows);
});

// Mettre à jour les jeux terminés pour l'utilisateur connecté
router.patch("/me/games", async (req, res) => {
    const user = req.user;
    const {
        hasFinishedGame1,
        hasFinishedGame2,
        hasFinishedGame3,
        hasFinishedGame4,
    } = req.body;

    try {
        const updates: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (hasFinishedGame1 !== undefined) {
            updates.push(`has_finished_game1 = $${paramIndex++}`);
            values.push(hasFinishedGame1);
        }
        if (hasFinishedGame2 !== undefined) {
            updates.push(`has_finished_game2 = $${paramIndex++}`);
            values.push(hasFinishedGame2);
        }
        if (hasFinishedGame3 !== undefined) {
            updates.push(`has_finished_game3 = $${paramIndex++}`);
            values.push(hasFinishedGame3);
        }
        if (hasFinishedGame4 !== undefined) {
            updates.push(`has_finished_game4 = $${paramIndex++}`);
            values.push(hasFinishedGame4);
        }

        if (updates.length === 0) {
            return res
                .status(400)
                .json({ error: "Aucune donnée à mettre à jour" });
        }

        values.push(user?.id);
        const query = `UPDATE users SET ${updates.join(
            ", "
        )} WHERE id = $${paramIndex} RETURNING id, login, role, has_finished_game1 as "hasFinishedGame1", has_finished_game2 as "hasFinishedGame2", has_finished_game3 as "hasFinishedGame3", has_finished_game4 as "hasFinishedGame4"`;

        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

export default router;

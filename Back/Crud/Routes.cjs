const express = require('express');
const router = express.Router();
const UsuariosController = require('./UsuariosController.cjs');
const { authenticateToken, authorizeRole } = require('./authMiddleware.cjs');

// Rota para aprovar usuário
router.put('/usuarios/aprovar/:id', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const id = req.params.id;
        const affectedRows = await UsuariosController.aprovarUsuario(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Usuário aprovado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao aprovar usuário:', err);
        res.status(500).json({ error: 'Erro ao aprovar usuário' });
    }
});

// Rota para rejeitar usuário
router.put('/usuarios/rejeitar/:id', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const id = req.params.id;
        const affectedRows = await UsuariosController.rejeitarUsuario(id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Usuário rejeitado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao rejeitar usuário:', err);
        res.status(500).json({ error: 'Erro ao rejeitar usuário' });
    }
});

module.exports = router;

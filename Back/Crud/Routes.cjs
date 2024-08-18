const express = require('express');
const router = express.Router();
const UsuariosController = require('./UsuariosController.cjs');

// Rota para aprovar um usuário
router.put('/usuarios/aprovar/:id', async (req, res) => {
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

// Rota para rejeitar um usuário
router.put('/usuarios/rejeitar/:id', async (req, res) => {
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

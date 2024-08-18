const express = require('express');
const router = express.Router();
const UsuariosController = require('./UsuariosController.cjs');

router.put('/usuarios/aprovar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.aprovarUsuario(id);
        res.status(200).json({ message: 'Usuário aprovado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao aprovar usuário' });
    }
});


router.put('/usuarios/rejeitar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.rejeitarUsuario(id);
        res.status(200).json({ message: 'Usuário rejeitado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao rejeitar usuário' });
    }
});

module.exports = router;

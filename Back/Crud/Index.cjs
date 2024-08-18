const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./DB.cjs');
const GenericController = require('./BaseController.cjs');
const UsuariosController = require('./UsuariosController.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Função para criar endpoints de forma dinâmica para um determinado controller e rota
const createEndpoints = (controller, route) => {
    app.post(`/api/${route}`, (req, res) => controller.create(req, res));
    app.get(`/api/${route}`, (req, res) => controller.getAll(req, res));
    app.get(`/api/${route}/:id`, (req, res) => controller.getById(req, res));
    app.put(`/api/${route}/:id`, (req, res) => controller.update(req, res));
    app.delete(`/api/${route}/:id`, (req, res) => controller.delete(req, res));
};

// Criação dos endpoints para as tabelas
createEndpoints(new GenericController('Tipo_Contratacao'), 'tipo_contratacao');
createEndpoints(new GenericController('Jornadas'), 'jornadas');
createEndpoints(new GenericController('Tipo_Plantao'), 'tipo_plantao');
createEndpoints(new GenericController('Tipo_Ponto'), 'tipo_ponto');
createEndpoints(new GenericController('Responsabilidades'), 'responsabilidades');
createEndpoints(new GenericController('Tipo_Debito_Credito'), 'tipo_debito_credito');
createEndpoints(new GenericController('Cerca_Digital'), 'cerca_digital');
createEndpoints(new GenericController('Endereco'), 'endereco');
createEndpoints(new GenericController('Contato'), 'contato');
createEndpoints(new GenericController('Cargos'), 'cargos');
createEndpoints(new GenericController('Plantoes'), 'plantoes');
createEndpoints(new GenericController('Clientes'), 'clientes');
createEndpoints(new GenericController('Projetos'), 'projetos');
createEndpoints(new GenericController('Colaboradores'), 'colaboradores');
createEndpoints(new GenericController('Banco_de_Horas'), 'banco_de_horas');
createEndpoints(new GenericController('Colaborador_Autorizante'), 'colaborador_autorizante');
createEndpoints(new GenericController('Ausencias'), 'ausencias');
createEndpoints(new GenericController('Horas_Extras'), 'horas_extras');
createEndpoints(new GenericController('Suspensao'), 'suspensoes');
createEndpoints(new GenericController('Ponto'), 'ponto');
createEndpoints(new GenericController('Plantao_Colaborador'), 'plantao_colaborador');
createEndpoints(new GenericController('Colaboradores_Banco_de_Horas'), 'colaboradores_banco_de_horas');

// Endpoints específicos para usuários
app.post('/api/usuarios/register', (req, res) => UsuariosController.register(req, res));
app.post('/api/usuarios/login', (req, res) => UsuariosController.login(req, res));
app.put('/api/usuarios/aprovar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.aprovarUsuario(id);
        res.status(200).json({ message: 'Usuário aprovado com sucesso' });
    } catch (err) {
        console.error('Erro ao aprovar usuário:', err);
        res.status(500).json({ error: 'Erro ao aprovar usuário' });
    }
});

app.put('/api/usuarios/rejeitar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.rejeitarUsuario(id);
        res.status(200).json({ message: 'Usuário rejeitado com sucesso' });
    } catch (err) {
        console.error('Erro ao rejeitar usuário:', err);
        res.status(500).json({ error: 'Erro ao rejeitar usuário' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GenericController = require('./BaseController.cjs');
const UsuariosController = require('./UsuariosController.cjs');
const { authenticateToken, authorizeRole } = require('./authMiddleware.cjs');
const db = require('./DB.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Função para criar endpoints genéricos, com opção de não serem protegidos
const createEndpoints = (controller, route, isProtected = true) => {
    if (isProtected) {
        app.post(`/api/${route}`, authenticateToken, (req, res) => controller.create(req, res));
        app.get(`/api/${route}`, authenticateToken, (req, res) => controller.getAll(req, res));
        app.get(`/api/${route}/:id`, authenticateToken, (req, res) => controller.getById(req, res));
        app.put(`/api/${route}/:id`, authenticateToken, (req, res) => controller.update(req, res));
        app.delete(`/api/${route}/:id`, authenticateToken, (req, res) => controller.delete(req, res));
    } else {
        app.post(`/api/${route}`, (req, res) => controller.create(req, res));
        app.get(`/api/${route}`, (req, res) => controller.getAll(req, res));
        app.get(`/api/${route}/:id`, (req, res) => controller.getById(req, res));
        app.put(`/api/${route}/:id`, (req, res) => controller.update(req, res));
        app.delete(`/api/${route}/:id`, (req, res) => controller.delete(req, res));
    }
};

// Criação dos endpoints para as tabelas, sem proteção para rotas usadas no cadastro
createEndpoints(new GenericController('Tipo_Contratacao'), 'tipo_contratacao', false);
createEndpoints(new GenericController('Tipo_Debito_Credito'), 'tipo_debito_credito', false);
createEndpoints(new GenericController('Responsabilidades'), 'responsabilidades', false);
createEndpoints(new GenericController('Cargos'), 'cargos', false);
createEndpoints(new GenericController('Endereco'), 'endereco', false);
createEndpoints(new GenericController('Contato'), 'contato', false);
createEndpoints(new GenericController('Colaboradores'), 'colaboradores', false);

// Outros endpoints que devem ser protegidos por autenticação
createEndpoints(new GenericController('Jornadas'), 'jornadas');
createEndpoints(new GenericController('Tipo_Plantao'), 'tipo_plantao');
createEndpoints(new GenericController('Tipo_Ponto'), 'tipo_ponto');
createEndpoints(new GenericController('Cerca_Digital'), 'cerca_digital');
createEndpoints(new GenericController('Plantoes'), 'plantoes');
createEndpoints(new GenericController('Clientes'), 'clientes');
createEndpoints(new GenericController('Projetos'), 'projetos');
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

// Protege as rotas de aprovação/rejeição de usuários para serem acessadas apenas por gestores
app.put('/api/usuarios/aprovar/:id', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.aprovarUsuario(id);
        res.status(200).json({ message: 'Usuário aprovado com sucesso' });
    } catch (err) {
        console.error('Erro ao aprovar usuário:', err);
        res.status(500).json({ error: 'Erro ao aprovar usuário' });
    }
});

app.put('/api/usuarios/rejeitar/:id', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.rejeitarUsuario(id);
        res.status(200).json({ message: 'Usuário rejeitado com sucesso' });
    } catch (err) {
        console.error('Erro ao rejeitar usuário:', err);
        res.status(500).json({ error: 'Erro ao rejeitar usuário' });
    }
});
// Endpoint para buscar todos os usuários com status 'pendente'
app.get('/api/usuarios/pendentes', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const pendenteUsers = await UsuariosController.getPendenteUsers();

        res.status(200).json(pendenteUsers);
    } catch (err) {
        console.error('Erro ao buscar usuários pendentes:', err);
        res.status(500).json({ error: 'Erro ao buscar usuários pendentes' });
    }
});

// No seu arquivo de rotas ou controller
// Endpoint para buscar detalhes de um usuário específico
app.get('/api/usuarios/:id', authenticateToken, authorizeRole('gestor'), async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuariosController.getById(id); // Supondo que existe um método getById no controlador
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao buscar detalhes do usuário:', err);
        res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
    }
});



// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

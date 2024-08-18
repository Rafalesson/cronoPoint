const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./DB.cjs');
const GenericController = require('./BaseController.cjs');
const UsuariosController = require('./UsuariosController.cjs');
const {router} = require("express/lib/application");

const tipoContratacaoController = new GenericController('Tipo_Contratacao');
const jornadasController = new GenericController('Jornadas');
const tipoPlantaoController = new GenericController('Tipo_Plantao');
const tipoPontoController = new GenericController('Tipo_Ponto');
const responsabilidadesController = new GenericController('Responsabilidades');
const tipoDebitoCreditoController = new GenericController('Tipo_Debito_Credito');
const cercaDigitalController = new GenericController('Cerca_Digital');
const enderecoController = new GenericController('Endereco');
const contatoController = new GenericController('Contato');
const cargosController = new GenericController('Cargos');
const plantoesController = new GenericController('Plantoes');
const clientesController = new GenericController('Clientes');
const projetosController = new GenericController('Projetos');
const colaboradoresController = new GenericController('Colaboradores');
const bancoDeHorasController = new GenericController('Banco_de_Horas');
const colaboradorAutorizanteController = new GenericController('Colaborador_Autorizante');
const ausenciasController = new GenericController('Ausencias');
const horasExtrasController = new GenericController('Horas_Extras');
const suspensaoController = new GenericController('Suspensao');
const pontoController = new GenericController('Ponto');
const plantaoColaboradorController = new GenericController('Plantao_Colaborador');
const colaboradoresBancoDeHorasController = new GenericController('Colaboradores_Banco_de_Horas');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const createEndpoints = (controller, route) => {
    app.post(`/api/${route}`, (req, res) => controller.create(req, res));
    app.get(`/api/${route}`, (req, res) => controller.getAll(req, res));
    app.get(`/api/${route}/:id`, (req, res) => controller.getById(req, res));
    app.put(`/api/${route}/:id`, (req, res) => controller.update(req, res));
    app.delete(`/api/${route}/:id`, (req, res) => controller.delete(req, res));
    app.post(`/api/${route}/`, (req, res) => router.update(req, res));
};

createEndpoints();


createEndpoints(tipoContratacaoController, 'tipo_contratacao');
createEndpoints(jornadasController, 'jornadas');
createEndpoints(tipoPlantaoController, 'tipo_plantao');
createEndpoints(tipoPontoController, 'tipo_ponto');
createEndpoints(responsabilidadesController, 'responsabilidades');
createEndpoints(tipoDebitoCreditoController, 'tipo_debito_credito');
createEndpoints(cercaDigitalController, 'cerca_digital');


createEndpoints(enderecoController, 'endereco');
createEndpoints(contatoController, 'contato');
createEndpoints(cargosController, 'cargos');
createEndpoints(plantoesController, 'plantoes');


createEndpoints(clientesController, 'clientes');


createEndpoints(projetosController, 'projetos');


createEndpoints(colaboradoresController, 'colaboradores');


createEndpoints(bancoDeHorasController, 'banco_de_horas');


createEndpoints(colaboradorAutorizanteController, 'colaborador_autorizante');
createEndpoints(ausenciasController, 'ausencias');
createEndpoints(horasExtrasController, 'horas_extras');
createEndpoints(suspensaoController, 'suspensoes');


createEndpoints(pontoController, 'ponto');
createEndpoints(plantaoColaboradorController, 'plantao_colaborador');
createEndpoints(colaboradoresBancoDeHorasController, 'colaboradores_banco_de_horas');

app.post('/api/usuarios/register', (req, res) => UsuariosController.register(req, res));
app.post('/api/usuarios/login', (req, res) => UsuariosController.login(req, res));
app.put('/api/usuarios/aprovar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.aprovarUsuario(id);
        res.status(200).json({ message: 'Usuário aprovado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao aprovar usuário' });
    }
});

app.put('/api/usuarios/rejeitar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await UsuariosController.rejeitarUsuario(id);
        res.status(200).json({ message: 'Usuário rejeitado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao rejeitar usuário' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const axios = require('axios');

const baseUrl = 'http://localhost:5000/api';

// Dados a serem inseridos em várias tabelas
const dados = {
    tipo_contratacao: { descricao: 'Teste Contratação' },
    jornadas: {
        id_sistema_externo: 'ext_teste',
        nome_jornada: 'Jornada Teste',
        seg: '1', ter: '1', qua: '1', qui: '1', sex: '1', sab: '0', dom: '0', flexivel: '1'
    },
    tipo_plantao: { descricao: 'Teste Plantão' },
    tipo_ponto: { descricao: 'Teste Ponto' },
    responsabilidades: {
        id_sistema_externo: 'ext_teste',
        descricao: 'Responsabilidade Teste'
    },
    tipo_debito_credito: { descricao: 'Teste Débito' },
    cerca_digital: { descricao: 'Cerca Teste' },
    endereco: {
        rua: 'Rua Teste', bairro: 'Bairro Teste', cidade: 'Cidade Teste', estado: 'Estado Teste',
        pais: 'País Teste', numero_casa: 100, complemento: 'Apto Teste', cep: '00000-000'
    },
    contato: {
        telefone_fixo: '111111111', telefone_celular: '999999999', aceita_sms: 1, aceita_whatsapp: 1, email: 'teste@teste.com'
    },
    cargos: {
        id_sistema_externo: 'ext_teste', nome_cargo: 'Cargo Teste', nivel: 'Junior', autorizador: 1
    },
    plantoes: {
        id_sistema_externo: 'ext_teste', nome_plantao: 'Plantão Teste', id_tipo_plantao_fk: 1
    },
    clientes: {
        id_sistema_externo: 'ext_teste', fantasia: 'Cliente Teste', razao_social: 'Razão Social Teste', horas_mensais: 160
    },
    projetos: {
        id_sistema_externo: 'ext_teste', nome_projeto: 'Projeto Teste', id_cliente_fk: 1,
        inicio: '2024-01-01', fim: '2024-12-31', horas_mensais: 160, horas_totais: 1920
    },
    colaboradores: {
        id_sistema_folga: 'folga_teste', nome: 'Gabriel', cpf: '123', ativo: 1,
        endereco: {
            rua: 'Rua Teste', bairro: 'Bairro Teste', cidade: 'Cidade Teste', estado: 'Estado Teste',
            pais: 'País Teste', numero_casa: 100, complemento: 'Apto Teste', cep: '00000-000'
        },
        contato: {
            telefone_fixo: '111111111', telefone_celular: '999999999', aceita_sms: 1, aceita_whatsapp: 1, email: 'teste@teste.com'
        },
        cargo: {
            id_sistema_externo: 'ext_teste', nome_cargo: 'Cargo Teste', nivel: 'Junior', autorizador: 1
        },
        plantao: {
            id_sistema_externo: 'ext_teste', nome_plantao: 'Plantão Teste', id_tipo_plantao_fk: 1
        },
        id_tipo_contratacao_fk: 1, id_jornada_fk: 1, id_plantao_fk: 1, id_cerca_digital_fk: 1, id_responsabilidades_fk: 1
    },
    banco_de_horas: {
        id_colaborador_fk: 1, id_validador_fk: 1, data_hora_lancamento: '2024-01-01 08:00:00',
        referente_mes: 1, referente_ano: 2024, lancamento_horas: 8, id_tipo_debito_credito_fk: 1, descricao: 'Teste Banco de Horas'
    },
    colaborador_autorizante: { id_colaborador_fk: 1 },
    ausencias: {
        id_colaborador_ausente_fk: 1, id_colaborador_autorizante_fk: 1, data_inicial: '2024-01-01', data_final: '2024-01-02',
        hora_inicial: '08:00', hora_final: '17:00', justificativa: 'Teste Ausência', aprovado: 1
    },
    horas_extras: {
        id_colaborador_beneficiado_fk: 1, id_colaborador_autorizante_fk: 1, id_cliente_fk: 1, id_projeto_fk: 1,
        data_inicial: '2024-01-01', data_final: '2024-01-01', hora_inicial: '18:00', hora_final: '20:00',
        tempo_maximo: 2, justificativa: 'Teste Horas Extras', aprovado: 1
    },
    suspensao: {
        id_colaborador_afetado_fk: 1, id_colaborador_autorizante_fk: 1, data_inicial: '2024-01-01',
        data_final: '2024-01-03', hora_inicial: '08:00', hora_final: '17:00', justificativa: 'Teste Suspensão', aprovado: 1
    },
    ponto: {
        data: '2024-01-01', hora: '08:00', id_tipo_ponto_fk: 1, localidade: 'Localidade Teste',
        id_colaborador_fk: 1, id_cliente_fk: 1, id_projeto_fk: 1
    },
    plantao_colaborador: { id_plantao_fk: 1, id_colaborador_fk: 1, descricao: 'Teste Plantão Colaborador' }
};

// Função para inserir dados nas tabelas
const inserirDados = async () => {
    for (const [rota, dado] of Object.entries(dados)) {
        try {
            const response = await axios.post(`${baseUrl}/${rota}`, dado);
            console.log(`Success: ${rota}`, response.data);
        } catch (error) {
            console.error(`Error: ${error.config ? error.config.url : 'URL não disponível'}`, error.response ? error.response.data : error.message);
        }
    }
};

// Chamar a função para inserir dados
inserirDados();

const axios = require('axios');

const baseUrl = 'http://localhost:5000/api';

// Função para inserir dados em sequência
const inserirDadosEmTodasAsTabelas = async () => {
    try {
        console.log('Iniciando inserção de dados em todas as tabelas...');

        // Dados de exemplo para inserção em cada tabela
        const dadosParaInsercao = {
            tipo_contratacao: { descricao: 'Contratação Padrão' },
            tipo_debito_credito: { descricao: 'Crédito Padrão' },
            responsabilidades: { descricao: 'Responsabilidade Padrão' },
            cargos: { nome_cargo: 'Cargo Padrão', nivel: 'Junior', autorizador: 1 },
            endereco: { rua: 'Rua Padrão', bairro: 'Bairro Padrão', cidade: 'Cidade Padrão', estado: 'Estado Padrão', pais: 'Brasil', numero_casa: 123, complemento: 'Apto 1', cep: '12345-678' },
            contato: { telefone_fixo: '1123456789', telefone_celular: '19987654321', aceita_sms: 1, aceita_whatsapp: 1, email: 'padrao@teste.com' },
            clientes: { fantasia: 'Cliente Padrão', razao_social: 'Razão Social Padrão', horas_mensais: 160 },
            jornadas: { nome_jornada: 'Jornada Padrão', seg: '1', ter: '1', qua: '1', qui: '1', sex: '1', sab: '0', dom: '0', flexivel: '1' },
            plantoes: { nome_plantao: 'Plantão Padrão' },
            tipo_ponto: { descricao: 'Ponto Padrão' },
            cerca_digital: { descricao: 'Cerca Padrão' },
        };

        // Inserir nas tabelas sem dependências
        const ids = {};
        for (const [rota, dados] of Object.entries(dadosParaInsercao)) {
            const response = await axios.post(`${baseUrl}/${rota}`, dados);
            console.log(`Sucesso: ${rota} inserido com ID:`, response.data.id);
            ids[rota] = response.data.id;  // Armazena o ID para as dependências
        }

        // Inserir nas tabelas com dependências indiretas
        const colaboradoresResponse = await axios.post(`${baseUrl}/colaboradores`, {
            nome: 'Gabriel1',
            cpf: '123',
            ativo: 1,
            id_tipo_contratacao_fk: ids.tipo_contratacao,
            id_cargo_fk: ids.cargos,
            id_endereco_fk: ids.endereco,
            id_contato_fk: ids.contato,
            id_responsabilidades_fk: ids.responsabilidades
        });
        ids.colaborador = colaboradoresResponse.data.id;
        console.log('Colaborador inserido com sucesso:', ids.colaborador);

        const projetosResponse = await axios.post(`${baseUrl}/projetos`, {
            nome_projeto: 'Projeto Padrão',
            id_cliente_fk: ids.clientes,
            inicio: '2024-01-01',
            fim: '2024-12-31',
            horas_mensais: 160,
            horas_totais: 1920
        });
        ids.projeto = projetosResponse.data.id;
        console.log('Projeto inserido com sucesso:', ids.projeto);

        const colaboradorJornadaResponse = await axios.post(`${baseUrl}/colaborador_jornada`, {
            id_colaborador_fk: ids.colaborador,
            id_jornada_fk: ids.jornadas
        });
        console.log('Colaborador Jornada inserido com sucesso:', colaboradorJornadaResponse.data.id);

        const colaboradorPlantaoResponse = await axios.post(`${baseUrl}/plantao_colaborador`, {
            id_colaborador_fk: ids.colaborador,
            id_plantao_fk: ids.plantoes
        });
        console.log('Plantao Colaborador inserido com sucesso:', colaboradorPlantaoResponse.data.id);

        const colaboradorCercaDigitalResponse = await axios.post(`${baseUrl}/colaborador_cerca_digital`, {
            id_colaborador_fk: ids.colaborador,
            id_cerca_digital_fk: ids.cerca_digital
        });
        console.log('Colaborador Cerca Digital inserido com sucesso:', colaboradorCercaDigitalResponse.data.id);

        const colaboradorTipoPontoResponse = await axios.post(`${baseUrl}/colaborador_tipo_ponto`, {
            id_colaborador_fk: ids.colaborador,
            id_tipo_ponto_fk: ids.tipo_ponto
        });
        console.log('Colaborador Tipo Ponto inserido com sucesso:', colaboradorTipoPontoResponse.data.id);

        // Inserir nas tabelas com dependências diretas
        const bancoHorasResponse = await axios.post(`${baseUrl}/banco_de_horas`, {
            id_colaborador_fk: ids.colaborador,
            id_validador_fk: ids.colaborador,
            data_hora_lancamento: '2024-01-01 08:00:00',
            referente_mes: 1,
            referente_ano: 2024,
            lancamento_horas: 8,
            id_tipo_debito_credito_fk: ids.tipo_debito_credito,
            descricao: 'Horas Padrão'
        });
        console.log('Banco de Horas inserido com sucesso:', bancoHorasResponse.data.id);

        const ausenciasResponse = await axios.post(`${baseUrl}/ausencias`, {
            id_colaborador_ausente_fk: ids.colaborador,
            id_colaborador_autorizante_fk: ids.colaborador,
            data_inicial: '2024-01-01',
            data_final: '2024-01-02',
            hora_inicial: '08:00',
            hora_final: '17:00',
            justificativa: 'Ausência Padrão',
            aprovado: 1
        });
        console.log('Ausências inseridas com sucesso:', ausenciasResponse.data.id);

        const horasExtrasResponse = await axios.post(`${baseUrl}/horas_extras`, {
            id_colaborador_beneficiado_fk: ids.colaborador,
            id_colaborador_autorizante_fk: ids.colaborador,
            id_cliente_fk: ids.clientes,
            id_projeto_fk: ids.projeto,
            data_inicial: '2024-01-01',
            data_final: '2024-01-01',
            hora_inicial: '18:00',
            hora_final: '20:00',
            tempo_maximo: 2,
            justificativa: 'Horas Extras Padrão',
            aprovado: 1
        });
        console.log('Horas Extras inseridas com sucesso:', horasExtrasResponse.data.id);

        const suspensaoResponse = await axios.post(`${baseUrl}/suspensoes`, {
            id_colaborador_afetado_fk: ids.colaborador,
            id_colaborador_autorizante_fk: ids.colaborador,
            data_inicial: '2024-01-01',
            data_final: '2024-01-03',
            hora_inicial: '08:00',
            hora_final: '17:00',
            justificativa: 'Suspensão Padrão',
            aprovado: 1
        });
        console.log('Suspensão inserida com sucesso:', suspensaoResponse.data.id);

        const pontoResponse = await axios.post(`${baseUrl}/ponto`, {
            data: '2024-01-01',
            hora: '08:00',
            id_tipo_ponto_fk: ids.tipo_ponto,
            localidade: 'Localidade Padrão',
            id_colaborador_fk: ids.colaborador,
            id_cliente_fk: ids.clientes,
            id_projeto_fk: ids.projeto
        });
        console.log('Ponto inserido com sucesso:', pontoResponse.data.id);

        const colaboradorAutorizanteResponse = await axios.post(`${baseUrl}/colaborador_autorizante`, {
            id_colaborador_fk: ids.colaborador
        });
        console.log('Colaborador Autorizante inserido com sucesso:', colaboradorAutorizanteResponse.data.id);

        console.log('Inserção de dados concluída com sucesso!');
    } catch (error) {
        console.error(`Erro durante a execução: ${error.config ? error.config.url : 'URL não disponível'}`, error.response ? error.response.data : error.message);
    }
};

// Chamar a função de teste para inserir dados
inserirDadosEmTodasAsTabelas();

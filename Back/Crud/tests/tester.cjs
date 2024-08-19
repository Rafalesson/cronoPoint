const axios = require('axios');

// Lista de URLs dos endpoints para serem testados
const urls = [
    'http://localhost:5000/api/tipo_contratacao',
    'http://localhost:5000/api/jornadas',
    'http://localhost:5000/api/tipo_plantao',
    'http://localhost:5000/api/tipo_ponto',
    'http://localhost:5000/api/responsabilidades',
    'http://localhost:5000/api/tipo_debito_credito',
    'http://localhost:5000/api/cerca_digital',
    'http://localhost:5000/api/endereco',
    'http://localhost:5000/api/contato',
    'http://localhost:5000/api/cargos',
    'http://localhost:5000/api/plantoes',
    'http://localhost:5000/api/clientes',
    'http://localhost:5000/api/projetos',
    'http://localhost:5000/api/colaboradores',
    'http://localhost:5000/api/banco_de_horas',
    'http://localhost:5000/api/colaborador_autorizante',
    'http://localhost:5000/api/ausencias',
    'http://localhost:5000/api/horas_extras',
    'http://localhost:5000/api/suspensoes',
    'http://localhost:5000/api/ponto',
    'http://localhost:5000/api/plantao_colaborador',
    'http://localhost:5000/api/colaboradores_banco_de_horas'
];

// Função para testar os endpoints
const testEndpoints = async () => {
    for (const url of urls) {
        try {
            const response = await axios.get(url);
            console.log(`Success: ${url}`, response.data);
        } catch (error) {
            if (error.response) {
                // Erros com resposta do servidor
                console.error(`Error: ${url} - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // Erros que ocorreram ao fazer o pedido mas sem resposta
                console.error(`Error: ${url} - Request made but no response received.`);
            } else {
                // Erros gerais que ocorreram ao configurar o pedido
                console.error(`Error: ${url} - Message: ${error.message}`);
            }
        }
    }
};

// Executa o teste dos endpoints
testEndpoints();

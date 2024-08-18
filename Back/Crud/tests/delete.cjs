const mysql = require('mysql2/promise');

async function clearDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    try {
        const tables = [
            // Tabelas que não existem no banco
            'Colaboradores_Banco_de_Horas',
            'Usuarios',

            // Tabelas que dependem de outras
            'Colaborador_Cerca_Digital',
            'Colaborador_Tipo_Ponto',
            'Plantao_Colaborador',
            'Ponto',
            'Suspensao',
            'Horas_Extras',
            'Ausencias',
            'Colaborador_Autorizante',
            'Banco_de_Horas',

            // Tabelas principais
            'Colaboradores',
            'Projetos',
            'Clientes',
            'Plantoes',
            'Cargos',
            'Contato',
            'Endereco',
            'Cerca_Digital',
            'Tipo_Debito_Credito',
            'Responsabilidades',
            'Tipo_Ponto',
            'Tipo_Plantao',
            'Jornadas',
            'Tipo_Contratacao'
        ];

        for (const table of tables) {
            try {
                await connection.query(`DELETE FROM ${table}`);
                console.log(`Dados da tabela ${table} deletados com sucesso`);
            } catch (err) {
                console.error(`Erro ao deletar dados na tabela ${table}:`, err.message);
            }
        }
    } catch (err) {
        console.error('Erro ao deletar dados:', err);
    } finally {
        await connection.end();
    }
}

clearDatabase().catch(console.error);

const mysql = require('mysql2/promise');
require('dotenv').config();

async function clearDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    try {
        const dependentTables = [
            'Colaborador_Tipo_Ponto',
            'Ponto',
            'Suspensao',
            'Horas_Extras',
            'Ausencias',
            'Colaborador_Autorizante',
            'Banco_de_Horas',
            'Colaborador_Jornada',
            'Colaborador_Plantao',
            'Colaborador_Cerca_Digital'
        ];

        const parentTables = [
            'Usuarios', // Adicionando a tabela Usuarios que depende de Colaboradores
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
            'Jornadas',
            'Tipo_Contratacao'
        ];

        // Excluindo dados das tabelas dependentes primeiro
        for (const table of dependentTables) {
            try {
                await connection.query(`DELETE FROM ${table}`);
                console.log(`Dados da tabela ${table} deletados com sucesso`);
            } catch (err) {
                console.error(`Erro ao deletar dados na tabela ${table}:`, err.message);
            }
        }

        // Excluindo dados das tabelas principais
        for (const table of parentTables) {
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

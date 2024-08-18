const mysql = require('mysql2/promise');

async function clearDatabase() {
    const connection = await mysql.createConnection({
        host: '172.183.189.222',
        user: 'ponciano',
        password: 'Ponciano@123',
        database: 'TeamNodeCP',
        port: 3306
    });

    try {
        const tables = [
            'Colaboradores_Banco_de_Horas', 'Plantao_Colaborador', 'Ponto',
            'Suspensao', 'Horas_Extras', 'Ausencias', 'Colaborador_Autorizante',
            'Banco_de_Horas', 'Usuarios', 'Colaboradores', 'Projetos', 'Clientes',
            'Plantoes', 'Cargos', 'Contato', 'Endereco', 'Cerca_Digital', 'Tipo_Debito_Credito',
            'Responsabilidades', 'Tipo_Ponto', 'Tipo_Plantao', 'Jornadas', 'Tipo_Contratacao'
        ];

        for (const table of tables) {
            await connection.query(`DELETE FROM ${table}`);
            console.log(`Dados da tabela ${table} deletados com sucesso`);
        }
    } catch (err) {
        console.error('Erro ao deletar dados:', err);
    } finally {
        await connection.end();
    }
}

clearDatabase().catch(console.error);

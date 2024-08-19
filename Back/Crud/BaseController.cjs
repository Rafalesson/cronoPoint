const db = require('./DB.cjs');


class GenericController {
    constructor(tableName) {
        this.tableName = tableName;
    }

    handleError(res, message, err) {
        console.error(message, err);
        res.status(500).json({
            error: message,
            details: err?.message || 'Erro desconhecido'
        });
    }

    handleSuccess(res, message, data = {}) {
        res.status(200).json({ message, ...data });
    }

    async tableExists(tableName) {
        const query = `SHOW TABLES LIKE ?`;
        return this.queryDB(query, [tableName])
            .then(results => results.length > 0);
    }

    async columnExists(tableName, columnName) {
        const query = `SHOW COLUMNS FROM ${tableName} LIKE ?`;
        return this.queryDB(query, [columnName])
            .then(results => results.length > 0);
    }

    async queryDB(sql, params) {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async insertData(tableName, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        return this.queryDB(sql, values).then(results => results.insertId);
    }

    async create(req, res) {
        const data = req.body;

        try {
            const tableExists = await this.tableExists(this.tableName);
            if (!tableExists) {
                throw new Error(`A tabela ${this.tableName} não existe no banco de dados`);
            }

            for (const column of Object.keys(data)) {
                const columnExists = await this.columnExists(this.tableName, column);
                if (!columnExists) {
                    throw new Error(`A coluna '${column}' não existe na tabela ${this.tableName}`);
                }
            }

            if (this.tableName === 'Colaboradores') {
                const colaboradorId = await this.handleColaboradores(data);
                this.handleSuccess(res, 'Colaborador inserido com sucesso', { id: colaboradorId });
            } else {
                const insertId = await this.insertData(this.tableName, data);
                this.handleSuccess(res, 'Dados inseridos com sucesso', { id: insertId });
            }
        } catch (err) {
            this.handleError(res, `Erro ao inserir dados na tabela ${this.tableName}`, err);
        }
    }

    async handleColaboradores(data) {
        try {
            const tipoContratacaoExists = await this.verifyReferenceExists('crono_point.Tipo_Contratacao', 'id_tipo_contratacao', data.id_tipo_contratacao_fk);
            if (!tipoContratacaoExists) {
                throw new Error('Tipo de contratação não existe');
            }

            if (data.endereco) {
                data.endereco.numero_casa = data.endereco.numero;  // Ajuste do nome da coluna
                delete data.endereco.numero;
                data.id_endereco_fk = await this.insertData('crono_point.Endereco', data.endereco);
                delete data.endereco;
            }

            if (data.contato) {
                data.id_contato_fk = await this.insertData('crono_point.Contato', data.contato);
                delete data.contato;
            }
            if (data.cargo) {
                data.id_cargo_fk = await this.insertData('crono_point.Cargos', data.cargo);
                delete data.cargo;
            }
            if (data.jornada) {
                data.id_jornada_fk = await this.insertData('crono_point.Jornadas', data.jornada);
                delete data.jornada;
            }

            const colaboradorId = await this.insertData('crono_point.Colaboradores', data);
            return colaboradorId;

        } catch (err) {
            console.error('Erro ao inserir colaborador:', err);
            throw err;
        }
    }

    async verifyReferenceExists(tableName, idColumn, idValue) {
        const sql = `SELECT 1 FROM ${tableName} WHERE ${idColumn} = ? LIMIT 1`;
        return this.queryDB(sql, [idValue])
            .then(results => results.length > 0);
    }

    getAll(req, res) {
        db.query(`SELECT * FROM ${this.tableName}`, (err, results) => {
            if (err) {
                this.handleError(res, `Erro ao buscar dados na tabela ${this.tableName}`, err);
            } else {
                this.handleSuccess(res, 'Dados buscados com sucesso', { results });
            }
        });
    }

    getById(req, res) {
        const id = req.params.id;
        const idColumn = this.tableName === 'Colaboradores' ? 'id_colaboradores' : 'id';

        db.query(`SELECT * FROM ${this.tableName} WHERE ${idColumn} = ?`, [id], (err, results) => {
            if (err || results.length === 0) {
                this.handleError(res, `Erro ao buscar dados na tabela ${this.tableName} pelo ID ${id}`, err);
            } else {
                this.handleSuccess(res, 'Dados buscados com sucesso', { result: results[0] });
            }
        });
    }

    update(req, res) {
        const id = req.params.id;
        const idColumn = this.tableName === 'Colaboradores' ? 'id_colaboradores' : 'id';
        const data = req.body;

        db.query(`UPDATE ${this.tableName} SET ? WHERE ${idColumn} = ?`, [data, id], (err, results) => {
            if (err) {
                this.handleError(res, `Erro ao atualizar dados na tabela ${this.tableName} pelo ID ${id}`, err);
            } else {
                this.handleSuccess(res, 'Dados atualizados com sucesso', { affectedRows: results.affectedRows });
            }
        });
    }

    delete(req, res) {
        const id = req.params.id;
        const idColumn = this.tableName === 'Colaboradores' ? 'id_colaboradores' : 'id';

        db.query(`DELETE FROM ${this.tableName} WHERE ${idColumn} = ?`, [id], (err, results) => {
            if (err) {
                this.handleError(res, `Erro ao deletar dados na tabela ${this.tableName} pelo ID ${id}`, err);
            } else {
                this.handleSuccess(res, 'Dados deletados com sucesso', { affectedRows: results.affectedRows });
            }
        });
    }
}

module.exports = GenericController;

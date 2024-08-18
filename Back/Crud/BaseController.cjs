const db = require('./DB.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosController = require('./UsuariosController.cjs');
const { Router } = require("express");
const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || '123'; // Use variáveis de ambiente para chaves secretas

class GenericController {
    constructor(tableName) {
        this.tableName = tableName;
    }

    handleError(res, message, err) {
        console.error(message, err);
        res.status(500).json({ error: message });
    }

    handleSuccess(res, message, data = {}) {
        res.status(200).json({ message, ...data });
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

    async create(req, res) {
        const data = req.body;

        try {
            if (this.tableName === 'Colaboradores') {
                await this.handleColaboradores(data);
            } else {
                await this.insertData(this.tableName, data);
            }
            this.handleSuccess(res, 'Dados inseridos com sucesso');
        } catch (err) {
            this.handleError(res, `Erro ao inserir dados na tabela ${this.tableName}`, err);
        }
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

    insertData(tableName, data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${tableName} SET ?`, data, (err, results) => {
                if (err) {
                    console.error(`Erro ao inserir dados na tabela ${tableName}:`, err);
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    async handleColaboradores(data) {
        try {
            // Inserção de dados relacionados ao colaborador
            data.id_endereco_fk = await this.insertData('Endereco', data.endereco);
            data.id_contato_fk = await this.insertData('Contato', data.contato);
            data.id_cargo_fk = await this.insertData('Cargos', data.cargo);
            data.id_plantao_fk = await this.insertData('Plantoes', data.plantao);
            data.id_jornada_fk = await this.insertData('Jornadas', data.jornada); // Supondo que você também tem que inserir a jornada

            // Removendo propriedades que não pertencem diretamente à tabela 'Colaboradores'
            delete data.endereco;
            delete data.contato;
            delete data.cargo;
            delete data.plantao;
            delete data.jornada;

            // Inserindo o colaborador na tabela 'Colaboradores'
            const colaboradorId = await this.insertData('Colaboradores', data);

            // Registro automático de usuário
            await UsuariosController.registerAuto(colaboradorId, data.nome, data.cpf);

        } catch (err) {
            console.error('Erro ao inserir colaborador:', err);
            throw err;
        }
    }
}

module.exports = GenericController;

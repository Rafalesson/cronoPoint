const db = require('./DB.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || '123'; // Use variáveis de ambiente para chaves secretas

class UsuariosController {
    constructor() {
        this.tableName = 'Usuarios';
    }

    async aprovarUsuario(id) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Usuarios SET status = 'aprovado' WHERE id_usuario = ?`, [id], (err, results) => {
                if (err) {
                    console.error(`Erro ao aprovar usuário com ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    async rejeitarUsuario(id) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Usuarios SET status = 'rejeitado' WHERE id_usuario = ?`, [id], (err, results) => {
                if (err) {
                    console.error(`Erro ao rejeitar usuário com ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
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
        db.query(`SELECT * FROM ${this.tableName} WHERE id_usuario = ?`, [id], (err, results) => {
            if (err) {
                this.handleError(res, `Erro ao buscar dados na tabela ${this.tableName} pelo ID ${id}`, err);
            } else {
                this.handleSuccess(res, 'Dados buscados com sucesso', { result: results[0] });
            }
        });
    }

    async register(req, res) {
        const { email, senha, cargo, id_colaborador } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(senha, 10);
            const data = { email, senha: hashedPassword, cargo, id_colaborador, status: 'pendente' };

            await this.insertData(this.tableName, data);
            res.status(201).json({ message: 'Usuário registrado com sucesso e está pendente de aprovação' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    async registerAuto(colaboradorId, nome, cpf) {
        const email = `${nome.toLowerCase().replace(/\s+/g, '')}@emailempresa.com`;
        const senha = cpf;
        const cargo = 'colaborador';

        const hashedPassword = await bcrypt.hash(senha, 10);
        const data = { email, senha: hashedPassword, cargo, id_colaborador: colaboradorId, status: 'aprovado' }; // status como 'aprovado'

        await this.insertData(this.tableName, data);
    }

    async login(req, res) {
        const { email, senha } = req.body;

        db.query(`SELECT * FROM ${this.tableName} WHERE email = ?`, [email], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ error: 'Email ou senha inválidos' });
            }

            const user = results[0];

            if (user.status !== 'aprovado') {
                return res.status(403).json({ error: 'Usuário não aprovado. Contate o administrador.' });
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Email ou senha inválidos' });
            }

            const colaboradorId = user.id_colaborador;
            const token = jwt.sign({ id_usuario: user.id_usuario, cargo: user.cargo, id_colaborador: colaboradorId }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login realizado com sucesso', token, id_colaborador: colaboradorId });
        });
    }



    update(req, res) {
        const id = req.params.id;
        const data = req.body;
        db.query(`UPDATE ${this.tableName} SET ? WHERE id_usuario = ?`, [data, id], (err, results) => {
            if (err) {
                this.handleError(res, `Erro ao atualizar dados na tabela ${this.tableName} pelo ID ${id}`, err);
            } else {
                this.handleSuccess(res, 'Dados atualizados com sucesso', { affectedRows: results.affectedRows });
            }
        });
    }

    delete(req, res) {
        const id = req.params.id;
        db.query(`DELETE FROM ${this.tableName} WHERE id_usuario = ?`, [id], (err, results) => {
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
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }
}

module.exports = new UsuariosController();

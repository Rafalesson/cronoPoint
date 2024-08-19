
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./DB.cjs');

const SECRET_KEY = process.env.SECRET_KEY || '123';

class UsuariosController {
    constructor() {
        this.tableName = 'Usuarios';
    }

    async aprovarUsuario(id) {
        return this.updateUserStatus(id, 'aprovado');
    }

    async rejeitarUsuario(id) {
        return this.updateUserStatus(id, 'rejeitado');
    }


    async getPendenteUsers() {
        const query = `SELECT * FROM ${this.tableName} WHERE status = 'pendente'`;
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuários pendentes:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async getByIdC(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id_usuario = ?`;
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuário por ID:', err);
                    reject(err);
                } else {
                    resolve(results[0]); // Supondo que o ID é único e vai retornar apenas um resultado
                }
            });
        });
    }
    async getById(id) {
        const query = `
            SELECT u.*, c.nome, c.cpf, ct.telefone_celular, ct.telefone_fixo, ct.email AS contato_email, e.rua, e.numero_casa, e.bairro, e.cidade, e.estado, e.cep
            FROM ${this.tableName} u
            LEFT JOIN Colaboradores c ON u.id_colaborador = c.id_colaboradores
            LEFT JOIN Endereco e ON c.id_endereco_fk = e.id_endereco
            LEFT JOIN Contato ct ON c.id_contato_fk = ct.id_contato
            WHERE u.id_usuario = ?
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuário por ID:', err);
                    reject(err);
                } else {
                    resolve(results[0]); // Supondo que o ID é único e vai retornar apenas um resultado
                }
            });
        });
    }


    async updateUserStatus(id, status) {
        const query = `UPDATE ${this.tableName} SET status = ? WHERE id_usuario = ?`;
        return new Promise((resolve, reject) => {
            db.query(query, [status, id], (err, results) => {
                if (err) {
                    console.error(`Erro ao atualizar status do usuário com ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    async register(req, res) {
        const { email, senha, cargo, id_colaborador } = req.body;

        try {
            const existingUser = await this.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            const data = { email, senha: hashedPassword, cargo, id_colaborador, status: 'pendente' };

            await this.insertData(this.tableName, data);
            res.status(201).json({ message: 'Usuário registrado com sucesso e está pendente de aprovação' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                return res.status(400).json({ error: 'Email ou senha inválidos' });
            }

            if (user.status !== 'aprovado') {
                return res.status(403).json({ error: 'Usuário não aprovado. Contate o administrador.' });
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Email ou senha inválidos' });
            }

            const token = jwt.sign({ id_usuario: user.id_usuario, cargo: user.cargo, id_colaborador: user.id_colaborador }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login realizado com sucesso', token, id_colaborador: user.id_colaborador, cargo: user.cargo });
        } catch (err) {
            console.error('Erro no login:', err);
            res.status(500).json({ error: 'Erro no servidor' });
        }
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE email = ?`, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    insertData(tableName, data) {
        const query = `INSERT INTO ${tableName} SET ?`;
        return new Promise((resolve, reject) => {
            db.query(query, data, (err, results) => {
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

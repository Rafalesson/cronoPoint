import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroCompleto.css";

export default function CadastroCompleto() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleNext = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const baseUrl = "http://localhost:5000/api";
            const ids = {};

            const postData = async (endpoint, data) => {
                const response = await fetch(`${baseUrl}/${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`Erro ao acessar ${endpoint}: ${response.statusText}`);
                }

                return response.json();
            };

            console.log("Iniciando inserção de dados em todas as tabelas...");

            // Inserir dados nas tabelas sequencialmente
            ids.tipo_contratacao = (await postData("tipo_contratacao", { descricao: "Contratação Padrão" })).id;
            ids.tipo_debito_credito = (await postData("tipo_debito_credito", { descricao: "Crédito Padrão" })).id;
            ids.responsabilidades = (await postData("responsabilidades", { descricao: "Responsabilidade Padrão" })).id;
            ids.cargos = (await postData("cargos", { nome_cargo: formData.cargo, nivel: "Junior", autorizador: 1 })).id;
            ids.endereco = (await postData("endereco", formData.endereco)).id;
            ids.contato = (await postData("contato", {
                telefone_fixo: formData.telefoneFixo,
                telefone_celular: formData.telefoneCelular,
                aceita_sms: 1,
                aceita_whatsapp: 1,
                email: formData.email,
            })).id;

            const colaboradorResponse = await postData("colaboradores", {
                nome: formData.nome,
                cpf: formData.cpf,
                ativo: 1,
                id_tipo_contratacao_fk: ids.tipo_contratacao,
                id_cargo_fk: ids.cargos,
                id_endereco_fk: ids.endereco,
                id_contato_fk: ids.contato,
                id_responsabilidades_fk: ids.responsabilidades,
            });

            await postData("usuarios/register", {
                email: formData.email,
                senha: formData.senha,
                cargo: formData.cargo,
                id_colaborador: colaboradorResponse.id, // Vincula o usuário ao colaborador criado
            });

            console.log("Inserção de dados concluída com sucesso!");

            navigate(formData.cargo === "gestor" ? "/gestor-dashboard" : "/dashboard");
        } catch (error) {
            console.error("Erro ao cadastrar colaborador:", error.message);
            alert(`Erro ao cadastrar colaborador: ${error.message}`);
        }
    };

    return (
        <section id="cadastroCompleto">
            {step === 1 && <CadastroDadosPessoais onNext={handleNext} />}
            {step === 2 && <CadastroEndereco onNext={handleNext} />}
            {step === 3 && <CadastroDadosAcesso onNext={handleNext} />}
            {step === 4 && (
                <form id="finalizarCadastroForm" onSubmit={handleSubmit}>
                    <button type="submit" className="btnFinalizar">
                        Finalizar Cadastro
                    </button>
                </form>
            )}
        </section>
    );
}

function CadastroDadosPessoais({ onNext }) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [telefoneFixo, setTelefoneFixo] = useState("");
    const [telefoneCelular, setTelefoneCelular] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ nome, cpf, nascimento, telefoneFixo, telefoneCelular });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label>Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>CPF</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Data de Nascimento</label>
                <input
                    type="date"
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Telefone Fixo</label>
                <input
                    type="tel"
                    value={telefoneFixo}
                    onChange={(e) => setTelefoneFixo(e.target.value)}
                />
            </div>
            <div className="formGroup">
                <label>Telefone Celular</label>
                <input
                    type="tel"
                    value={telefoneCelular}
                    onChange={(e) => setTelefoneCelular(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Próximo</button>
        </form>
    );
}

function CadastroEndereco({ onNext }) {
    const [rua, setRua] = useState("");
    const [numeroCasa, setNumeroCasa] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [pais, setPais] = useState("");
    const [cep, setCep] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ endereco: { rua, numero_casa: numeroCasa, bairro, cidade, estado, pais, cep } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label>Rua</label>
                <input
                    type="text"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Número</label>
                <input
                    type="text"
                    value={numeroCasa}
                    onChange={(e) => setNumeroCasa(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Bairro</label>
                <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Cidade</label>
                <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Estado</label>
                <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>País</label>
                <input
                    type="text"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Próximo</button>
        </form>
    );
}

function CadastroDadosAcesso({ onNext }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ email, senha, cargo });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Senha</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <label>Cargo</label>
                <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
                    <option value="">Selecione um cargo</option>
                    <option value="colaborador">Colaborador</option>
                    <option value="gestor">Gestor</option>
                </select>
            </div>
            <button type="submit">Finalizar</button>
        </form>
    );
}

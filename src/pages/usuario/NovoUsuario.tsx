import React, { useState } from 'react';

const NovoUsuario: React.FC = () => {
  const [formData, setFormData] = useState({
    tipoConta: '',
    apelido: '',
    sexo: '',
    email: '',
    telefone: '',
    celular: '',
    nascimento: '',
    usuario: '',
    senha: '',
    confirmeSenha: '',
  });

  const [usuarioExistente, setUsuarioExistente] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Verifique se o email ou usuário já existe
    if (formData.usuario === 'ca88321499@gmail.com') {
      setUsuarioExistente(true);
    } else {
      setUsuarioExistente(false);
      // Aqui você pode processar o envio dos dados do formulário
      console.log('Formulário enviado:', formData);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Tipo de Conta */}
          <div>
            <label className="block">Tipo de Conta</label>
            <select
              name="tipoConta"
              value={formData.tipoConta}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Selecione</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="medico">Médico</option>
              <option value="medicoAvulso">Médico Avulso (não possui login)</option>
            </select>
          </div>

          {/* Apelido */}
          <div>
            <label className="block">Apelido</label>
            <input
              type="text"
              name="apelido"
              value={formData.apelido}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="block">Celular</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Nascimento */}
          <div>
            <label className="block">Nascimento</label>
            <input
              type="date"
              name="nascimento"
              value={formData.nascimento}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Usuário */}
          <div>
            <label className="block">Usuário</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {usuarioExistente && (
              <p className="text-red-500 text-sm mt-1">Usuário existente. Por favor, escolha outro.</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Confirme a Senha */}
          <div>
            <label className="block">Confirme a Senha</label>
            <input
              type="password"
              name="confirmeSenha"
              value={formData.confirmeSenha}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded w-full"
            disabled={usuarioExistente}
          >
            {usuarioExistente ? 'Escolha outro usuário' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoUsuario;

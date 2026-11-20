import React, { useState } from 'react';

const NovaEntrada: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Entrada</h1>
      <div className="tabs mb-4">
        <ul className="flex border-b">
          <li
            className={`mr-4 pb-2 cursor-pointer ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Dados do Cliente
          </li>
          <li
            className={`mr-4 pb-2 cursor-pointer ${activeTab === 2 ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Dados da Entrada
          </li>
        </ul>
      </div>

      {activeTab === 1 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Dados do Cliente</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Foto do Paciente</label>
              <input type="file" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Nome</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Nascimento</label>
              <input type="date" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Idade</label>
              <input type="number" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Sexo</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block">Estado Civil</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                <option>Solteiro</option>
                <option>Casado</option>
                <option>Divorciado</option>
                <option>Viúvo</option>
              </select>
            </div>
            <div>
              <label className="block">RG</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">CPF</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Orgão Emissor</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Celular</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Telefone</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Email</label>
              <input type="email" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Profissão</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Empresa</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Mãe</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Profissão Mãe</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Pai</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Profissão Pai</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Nascimento Pai</label>
              <input type="date" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Nascimento Mãe</label>
              <input type="date" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Responsável</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Profissão do paciente</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">CEP</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">UF</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione os estados */}
              </select>
            </div>
            <div>
              <label className="block">Cidade</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Número</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Endereço</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Bairro</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Origem</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Dados da Entrada</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Data/Hora</label>
              <input type="datetime-local" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Profissional</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" defaultValue="Carlos Augusto" />
            </div>
            <div>
              <label className="block">Titular</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" defaultValue="Matrícula" />
            </div>
            <div>
              <label className="block">Convênio</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione as opções de convênios */}
              </select>
            </div>
            <div>
              <label className="block">Plano</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione os planos */}
              </select>
            </div>
            <div>
              <label className="block">Senha</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Guia</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Tipo Atend.</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione os tipos de atendimento */}
              </select>
            </div>
            <div>
              <label className="block">Tipo consulta</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione os tipos de consulta */}
              </select>
            </div>
            <div>
              <label className="block">Prioridade</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Selecione</option>
                {/* Adicione as prioridades */}
              </select>
            </div>
            <div>
              <label className="block">Validade carteira</label>
              <input type="date" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Telemedicina</label>
              <select className="mt-1 p-2 border border-gray-300 rounded">
                <option>Não</option>
                <option>Sim</option>
              </select>
            </div>
            <div>
              <label className="block">Peso (kg)</label>
              <input type="number" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Perímetro Cefálico (cm)</label>
              <input type="number" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Altura (m)</label>
              <input type="number" step="0.01" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Observação</label>
              <textarea className="mt-1 p-2 border border-gray-300 rounded"></textarea>
            </div>
            <div>
              <label className="block">Procedimento(s)</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block">Solicitante</label>
              <input type="text" className="mt-1 p-2 border border-gray-300 rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovaEntrada;

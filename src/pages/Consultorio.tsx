import React, { useState } from 'react';

const Consultorio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('entrada');

  const renderContent = () => {
    switch (activeTab) {
      case 'entrada':
        return <div>Conteúdo da aba Entrada</div>;
      case 'agenda':
        return <div>Conteúdo da aba Agenda</div>;
      case 'consulta':
        return <div>Conteúdo da aba Consulta</div>;
      case 'historico':
        return <div>Conteúdo da aba Histórico</div>;
      case 'imagensPdf':
        return <div>Conteúdo da aba Imagens/PDF</div>;
      case 'solicitacoes':
        return <div>Conteúdo da aba Solicitações</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Consultório</h1>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'entrada' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('entrada')}
        >
          Entrada
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'agenda' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('agenda')}
        >
          Agenda
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'consulta' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('consulta')}
        >
          Consulta
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'historico' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'imagensPdf' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('imagensPdf')}
        >
          Imagens/PDF
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'solicitacoes' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('solicitacoes')}
        >
          Solicitações
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-4 border rounded-md shadow-sm">{renderContent()}</div>
    </div>
  );
};

export default Consultorio;

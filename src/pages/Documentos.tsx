import React, { useState } from 'react';

const Documentos: React.FC = () => {
  const [documentType, setDocumentType] = useState<string>('Texto');
  const [date, setDate] = useState<string>('32/14');
  const [fontSize, setFontSize] = useState<number>(10);
  const [isSavingAsTemplate, setIsSavingAsTemplate] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>('');

  const handleSaveAsTemplate = () => {
    if (templateName.trim() === '') {
      alert('Por favor, insira um nome para o modelo.');
      return;
    }
    // Lógica para salvar o modelo (API ou Local Storage)
    alert(`Modelo "${templateName}" salvo com sucesso!`);
    setIsSavingAsTemplate(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Biblioteca de Documentos</h1>

      {/* Opções principais */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          Novo Documento
        </button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400">
          Meus Modelos
        </button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400">
          Modelos do Sistema
        </button>
      </div>

      {/* Configurações de Documento */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Tipo de Documento */}
        <div>
          <label className="block font-medium mb-2">Tipo de Documento</label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="Texto">Texto</option>
            <option value="Data da Receita">Data da Receita</option>
            <option value="32/14">32/14</option>
            <option value="Assistente de Receita">Assistente de Receita</option>
          </select>
        </div>

        {/* Variáveis */}
        <div>
          <label className="block font-medium mb-2">Variáveis</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          >
            <option value={10}>Tipo de Fonte 1 (10pt)</option>
            <option value={12}>Tipo de Fonte 2 (12pt)</option>
            <option value={14}>Tipo de Fonte 3 (14pt)</option>
          </select>
        </div>
      </div>

      {/* Ações */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Ação</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mr-4"
          onClick={() => setIsSavingAsTemplate(true)}
        >
          Salvar como Modelo
        </button>
        {isSavingAsTemplate && (
          <div className="mt-4">
            <label className="block font-medium mb-2">Nome do Modelo</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
              placeholder="Digite o nome do modelo"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mr-2"
              onClick={handleSaveAsTemplate}
            >
              Salvar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
              onClick={() => setIsSavingAsTemplate(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentos;

import React, { useState } from 'react';

const Bulario: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('bulario');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [medications] = useState<string[]>([
    'Paracetamol',
    'Ibuprofeno',
    'Amoxicilina',
    'Dipirona',
  ]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Por favor, insira um termo para procurar.');
      return;
    }
    alert(`Buscando "${searchTerm}" na base de dados...`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Bulário</h1>

      {/* Tabs Navigation */}
      <div className="border-b mb-4">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => setActiveTab('bulario')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'bulario' ? 'border-blue-500 text-blue-500' : 'border-transparent'
              }`}
            >
              Bulário
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('medicamentos')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'medicamentos' ? 'border-blue-500 text-blue-500' : 'border-transparent'
              }`}
            >
              Medicamentos
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('anvisa')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'anvisa' ? 'border-blue-500 text-blue-500' : 'border-transparent'
              }`}
            >
              Procurar Bula na Anvisa
            </button>
          </li>
        </ul>
      </div>

      {/* Tabs Content */}
      <div>
        {activeTab === 'bulario' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bulário</h2>
            <p>Bem-vindo ao Bulário. Aqui você pode gerenciar informações sobre medicamentos.</p>
          </div>
        )}

        {activeTab === 'medicamentos' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Medicamentos</h2>
            <ul className="list-disc pl-5">
              {medications.map((medication, index) => (
                <li key={index} className="mb-1">
                  {medication}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'anvisa' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Procurar Bula na Anvisa</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Digite o nome do medicamento:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex.: Paracetamol"
                  className="border rounded px-3 py-2 flex-grow"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                  Procurar
                </button>
              </div>
            </div>
            <a
              href="https://www.gov.br/anvisa/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Ir para o site da Anvisa
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bulario;

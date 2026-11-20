import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users, Clock, FileText } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Painel</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consultas de Hoje</p>
              <h3 className="text-xl font-semibold text-gray-900">12</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
              <h3 className="text-xl font-semibold text-gray-900">1.234</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consultas Pendentes</p>
              <h3 className="text-xl font-semibold text-gray-900">8</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Relatórios</p>
              <h3 className="text-xl font-semibold text-gray-900">25</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultas Recentes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Nome do Paciente</p>
                  <p className="text-sm text-gray-500">Consulta Geral</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Hoje, 14:00</p>
                  <p className="text-sm text-gray-500">Dr. Silva</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Agendar Nova Consulta
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Cadastrar Novo Paciente
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Gerar Relatórios
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Ver Agenda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function Appointments() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          New Appointment
        </button>
      </header>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
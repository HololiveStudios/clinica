import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Patient {
  name: string;
  cpf: string;
  phone: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

interface AppointmentType {
  id: number;
  name: string;
  duration: number;
}

export const ScheduleAppointment = () => {
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);

  // Função para buscar paciente
  const searchForPatient = async (searchTerm: string) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`http://localhost:3000/api/patient?searchTerm=${searchTerm}`);
      if (response.ok) {
        const patient = await response.json();
        setSelectedPatient(patient);
      } else {
        setSelectedPatient(null);
        alert('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      alert('Error fetching patient');
    }
  };

  // Função para carregar os horários disponíveis
  const fetchTimeSlots = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/timeSlots');
      const slots = await response.json();
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  // Função para carregar os médicos
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/doctors');
      const docs = await response.json();
      setDoctors(docs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Função para carregar os tipos de consulta
  const fetchAppointmentTypes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/appointmentTypes');
      const types = await response.json();
      setAppointmentTypes(types);
    } catch (error) {
      console.error('Error fetching appointment types:', error);
    }
  };

  // Carregar dados quando o componente for montado
  useEffect(() => {
    fetchTimeSlots();
    fetchDoctors();
    fetchAppointmentTypes();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Schedule Appointment</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient by name or CPF..."
                className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2"
                value={searchPatient}
                onChange={(e) => {
                  setSearchPatient(e.target.value);
                  searchForPatient(e.target.value);
                }}
              />
            </div>
            
            {selectedPatient && (
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900">Selected Patient</h3>
                <p className="text-sm text-gray-600">Name: {selectedPatient.name}</p>
                <p className="text-sm text-gray-600">CPF: {selectedPatient.cpf}</p>
                <p className="text-sm text-gray-600">Phone: {selectedPatient.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Patient Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent History</h2>
          {selectedPatient ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Last visit: 2024-01-10</p>
              <p className="text-sm text-gray-600">Upcoming appointments: 1</p>
              <p className="text-sm text-gray-600">Status: Active</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select a patient to view history</p>
          )}
        </div>

        {/* Appointment Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Select doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="">Select type</option>
                {appointmentTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.duration} mins)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={selectedDate ? undefined : ''}
                disabled={!selectedDate || !selectedDoctor}
              >
                <option value="">Select time slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={!selectedPatient || !selectedDoctor || !selectedDate || !appointmentType}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

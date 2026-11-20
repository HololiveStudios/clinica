import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Appointments } from './pages/consultorio/Appointments';
import { ScheduleAppointment } from './pages/consultorio/ScheduleAppointment';
import { AuthProvider } from './contexts/AuthContext';
import Consultorio from './pages/Consultorio';
import Documentos from './pages/Documentos';
import Bulario from './pages/consultorio/Bulario';
import Entrada from './pages/Entrada';
import ListaEntrada from './pages/entrada/ListaEntrada';
import Recebimentos from './pages/entrada/Recebimentos';
import FechamentoConvenio from './pages/entrada/FechamentoConvenio';
import FechamentoParticular from './pages/entrada/FechamentoParticular';
import NovoUsuario from './pages/usuario/NovoUsuario';
import GerenciamentoUsuario from './pages/usuario/GerenciamentoUsuario';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="schedule" element={<ScheduleAppointment />} />
            <Route path="settings" element={<Settings />} />
            <Route path="consultorio" element={<Consultorio />} />
            <Route path="Documentos" element={<Documentos />} />
            <Route path="consultorio/bulario" element={<Bulario />} />
            <Route path="entrada" element={<Entrada />} />
            <Route path="entrada/lista" element={<ListaEntrada />} />
            <Route path="entrada/recebimentos" element={<Recebimentos />} />
            <Route path="entrada/convenio" element={<FechamentoConvenio />} />
            <Route path="entrada/particular" element={<FechamentoParticular />} />
            <Route path="usuario/novo" element={<NovoUsuario />} />
            <Route path="usuario/gerenciamento" element={<GerenciamentoUsuario />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
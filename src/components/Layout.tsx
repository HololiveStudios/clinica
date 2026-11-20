import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Briefcase,
  LogOut,
} from 'lucide-react';

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = React.useState({});

  React.useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, navigate, location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleMenu = (menu) => {
    setExpandedMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex flex-col">
        <div className="p-4 flex items-center">
          <LayoutDashboard className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold">Clínica Safira</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Página Inicial
              </Link>
            </li>
            <li>
              <button
                onClick={() => toggleMenu('consultorio')}
                className="flex items-center justify-between px-4 py-2 w-full hover:bg-gray-700"
              >
                <span className="flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Consultório
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => toggleMenu('entrada')}
                className="flex items-center justify-between px-4 py-2 w-full hover:bg-gray-700"
              >
                <span className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Entrada
                </span>
              </button>
            </li>
            <li>
              <Link to="/documentos" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Documentos
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Configurações
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 text-red-400 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
}

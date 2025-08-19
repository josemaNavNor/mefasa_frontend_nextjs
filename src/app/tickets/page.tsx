"use client";
import { useState } from 'react';
import useTicketsPage from '../../hooks/useTicketsPage';
import Modal from '@/components/ui/modal';
import { logout } from '@/services/api/logout';
import { Search, Plus, Eye, Edit, Calendar, Clock, MoreVertical, Home, Ticket, Settings, Users, BarChart3, Bell, Download, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { UserMenu } from '@/components/ui/user-menu';

export default function TicketsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    tickets,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    selectedTicket,
    setSelectedTicket,
    isModalOpen,
    setIsModalOpen,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    getPriorityColor,
    getStatusColor,
    getStatusIcon,
    filteredTickets,
    formatDate
  } = useTicketsPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Cargando tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar Vertical del lado derecho */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-black/100 sticky top-0 z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img src="/LOGOMEFASA.png" alt="Logo MEFASA" className="h-18 w-auto" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Help Desk Mefasa
                  </h1>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Download className="w-5 h-5" />
                  Exportar
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Plus className="w-5 h-5" />
                  Nuevo Ticket
                </button>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
        {/* Filtros y búsqueda */}
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-black/10 backdrop-blur-lg rounded-2xl border border-black/20 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32 text-gray-900"
                >
                  <option value="all">Todos los estados</option>
                  <option value="abierto">Abierto</option>
                  <option value="en progreso">En progreso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32 text-gray-900"
                >
                  <option value="all">Todas las prioridades</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
          </div>
          {/* Lista de tickets con scroll horizontal */}
          <div className="bg-black/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-x-auto custom-horizontal-scroll" style={{ maxWidth: '100%', minWidth: '0' }}>
            <div style={{ minWidth: '1200px', maxHeight: '500px', overflowY: 'auto' }}>
              {/* Header de la tabla */}
              <div className="bg-white/40 backdrop-blur-sm border-b border-white/20 px-6 py-4 sticky top-0 z-10">
                <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-700">
                  <div className="col-span-2 min-w-28">Ticket</div>
                  <div className="col-span-3 min-w-48">Resumen</div>
                  <div className="col-span-1 min-w-24">Creador</div>
                  <div className="col-span-1 min-w-24">Asignado</div>
                  <div className="col-span-1 min-w-20">Estado</div>
                  <div className="col-span-1 min-w-20">Prioridad</div>
                  <div className="col-span-2 min-w-32">Fecha creación</div>
                  <div className="col-span-1 min-w-24">Vencimiento</div>
                </div>
              </div>
              {/* Filas de tickets */}
              <div className="divide-y divide-gray-200/50">
                {filteredTickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="group hover:bg-white/40 transition-all duration-200 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setIsModalOpen(true);
                      setMessages([
                        { sender: 'usuario', text: 'Hola, tengo un problema con este ticket.' },
                        { sender: 'tecnico', text: '¡Hola! ¿Puedes darme más detalles?' }
                      ]);
                    }}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center px-6 py-4">
                      <div className="col-span-2 min-w-28">
                        <div className="font-semibold text-gray-900">{ticket.ticket_number}</div>
                        <div className="text-xs text-gray-500">#{ticket.id}</div>
                      </div>
                      <div className="col-span-3 min-w-48">
                        <div className="font-medium text-gray-900 line-clamp-1">{ticket.summary}</div>
                        <div className="text-sm text-gray-600 line-clamp-2 mt-1">{ticket.description}</div>
                      </div>
                      <div className="col-span-1 min-w-24">
                        <div className="font-medium text-gray-900 text-sm truncate">{ticket.end_user_id}</div>
                      </div>
                      <div className="col-span-1 min-w-24">
                        <div className="font-medium text-gray-900 text-sm truncate">{ticket.technician_id}</div>
                      </div>
                      <div className="col-span-1 min-w-20">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 hidden lg:inline">{ticket.status}</span>
                        </span>
                      </div>
                      <div className="col-span-1 min-w-20">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          <span className="hidden lg:inline">{ticket.priority}</span>
                          <span className="lg:hidden">
                            {ticket.priority === 'Alta' ? '🔴' : ticket.priority === 'Media' ? '🟡' : '🟢'}
                          </span>
                        </span>
                      </div>
                      <div className="col-span-2 min-w-32 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{formatDate(ticket.created_at)}</span>
                        </div>
                      </div>
                      <div className="col-span-1 min-w-24 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span className={`truncate ${new Date(ticket.due_date) < new Date() ? 'text-red-600 font-medium' : ''}`}>
                            {new Date(ticket.due_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mensaje de no resultados */}
          {filteredTickets.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron tickets</h3>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
      {/* Navegación Vertical del lado derecho */}
      <nav className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/90 backdrop-blur-lg border-l border-gray-200/50 h-screen sticky top-0 z-20 flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Toggle Button */}
        <div className="absolute -left-3 top-6 z-30">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="bg-white border border-gray-200 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-gray-900"
            title={sidebarCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
        {/* Header del sidebar */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h3 className="text-lg font-semibold text-gray-900">Navegación</h3>
            )}
            <div className={`relative ${sidebarCollapsed ? 'mx-auto' : ''}`}>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 px-6 py-4">
          <div className="space-y-2">
            <a
              href="#"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-blue-600 bg-blue-50 font-medium rounded-lg border border-blue-200 transition-all duration-200 hover:bg-blue-100`}
              title={sidebarCollapsed ? "Tickets" : ""}
            >
              <Ticket className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Tickets</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200`}
              title={sidebarCollapsed ? "Usuarios" : ""}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Usuarios</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200`}
              title={sidebarCollapsed ? "Panel de control" : ""}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Panel de control</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200`}
              title={sidebarCollapsed ? "Configuración" : ""}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Configuración</span>}
            </a>
          </div>
        </div>
        {/* Footer del sidebar */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-gray-200/50">
            <div className="text-center">
              <p className="text-xs text-gray-500">© 2025 Help Desk Mefasa</p>
            </div>
          </div>
        )}
      </nav>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .custom-horizontal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #e0e7ff;
        }
        .custom-horizontal-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .custom-horizontal-scroll::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 8px;
        }
        .custom-horizontal-scroll::-webkit-scrollbar-track {
          background: #e0e7ff;
          border-radius: 8px;
        }
        .custom-horizontal-scroll::-webkit-scrollbar-corner {
          background: #e0e7ff;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
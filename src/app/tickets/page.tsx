"use client";

import useTicketsPage from '../../hooks/useTicketsPage';
import Modal from '@/components/ui/modal';
import { logout } from '@/services/api/logout';
import { Search, Plus, Eye, Edit, Calendar, Clock, MoreVertical } from 'lucide-react';

export default function TicketsPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <img src="/LOGOMEFASA.png" alt="Logo MEFASA" className="h-12 w-auto" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Gestión de Tickets
                </h1>
                <p className="text-gray-600 mt-1">Administra y da seguimiento a los tickets de soporte</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Plus className="w-5 h-5" />
                Nuevo Ticket
              </button>
              <button
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  logout();
                  window.location.href = '/sign_in';
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y búsqueda */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
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

            {/* Filtros */}
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

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {tickets.filter(t => t.status.toLowerCase() === 'abierto').length}
              </div>
              <div className="text-sm text-gray-600">Abiertos</div>
            </div>
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {tickets.filter(t => t.status.toLowerCase() === 'en progreso').length}
              </div>
              <div className="text-sm text-gray-600">En progreso</div>
            </div>
            <div className="bg-white/40 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {tickets.filter(t => t.status.toLowerCase() === 'cerrado').length}
              </div>
              <div className="text-sm text-gray-600">Cerrados</div>
            </div>
          </div>
        </div>

        {/* Lista de tickets */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header de la tabla */}
          <div className="bg-white/40 backdrop-blur-sm border-b border-white/20 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-700">
              <div className="col-span-2">Ticket</div>
              <div className="col-span-3">Resumen</div>
              <div className="col-span-1">Estado</div>
              <div className="col-span-1">Prioridad</div>
              <div className="col-span-2">Fecha creación</div>
              <div className="col-span-2">Fecha vencimiento</div>
              <div className="col-span-1">Acciones</div>
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
                  {/* Número de ticket */}
                  <div className="col-span-2">
                    <div className="font-semibold text-gray-900">{ticket.ticket_number}</div>
                    <div className="text-xs text-gray-500">#{ticket.id}</div>
                  </div>

                  {/* Resumen */}
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900 line-clamp-1">{ticket.summary}</div>
                    <div className="text-sm text-gray-600 line-clamp-2 mt-1">{ticket.description}</div>
                  </div>

                  {/* Estado */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      <span className="hidden sm:inline">{ticket.status}</span>
                    </span>
                  </div>

                  {/* Prioridad */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                      <span className="hidden sm:inline">{ticket.priority}</span>
                      <span className="sm:hidden">
                        {ticket.priority === 'Alta' ? '🔴' : ticket.priority === 'Media' ? '🟡' : '🟢'}
                      </span>
                    </span>
                  </div>

                  {/* Fecha creación */}
                  <div className="col-span-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(ticket.created_at)}</span>
                    </div>
                  </div>

                  {/* Fecha vencimiento */}
                  <div className="col-span-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className={`${new Date(ticket.due_date) < new Date() ? 'text-red-600 font-medium' : ''}`}>
                        {new Date(ticket.due_date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                          setIsModalOpen(true);
                        }}
                        title="Ver ticket"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="Editar ticket"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="Más opciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de conversación */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Conversación Ticket #{selectedTicket?.ticket_number}</h2>
            <div className="bg-gray-100 rounded-lg p-4 h-64 overflow-y-auto flex flex-col gap-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'usuario' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`px-4 py-2 rounded-xl text-sm max-w-xs ${msg.sender === 'usuario' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
                    <span className="font-semibold mr-2">{msg.sender === 'usuario' ? 'Usuario' : 'Técnico'}:</span>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 mt-4"
              onSubmit={e => {
                e.preventDefault();
                if (newMessage.trim() === '') return;
                setMessages([...messages, { sender: 'usuario', text: newMessage }]);
                setNewMessage('');
              }}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-500 text-gray-900"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
              >Enviar</button>
            </form>
          </div>
        </Modal>

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

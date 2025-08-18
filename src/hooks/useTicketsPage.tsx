import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

export interface Ticket {
  id: number;
  ticket_number: string;
  floor_id: number;
  area_id: number;
  end_user_id: number;
  technician_id: number;
  type_id: number;
  summary: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  assigned_at?: string;
  resolved_at?: string;
  closed_at?: string;
}

export default function useTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'tecnico' | 'usuario'; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setTickets([
        {
          id: 1,
          ticket_number: 'TCK-001',
          floor_id: 2,
          area_id: 3,
          end_user_id: 5,
          technician_id: 7,
          type_id: 1,
          summary: 'Problema de conexión de red',
          description: 'Los equipos del área de ventas no tienen conexión a internet desde esta mañana.',
          priority: 'Alta',
          status: 'Abierto',
          due_date: '2025-08-20',
          created_at: '2025-08-17T10:00:00',
          updated_at: '2025-08-17T10:05:00',
          assigned_at: '2025-08-17T10:10:00',
        },
        {
          id: 2,
          ticket_number: 'TCK-002',
          floor_id: 1,
          area_id: 2,
          end_user_id: 3,
          technician_id: 4,
          type_id: 2,
          summary: 'Impresora no funciona',
          description: 'La impresora del área administrativa no responde y muestra error de papel atascado.',
          priority: 'Media',
          status: 'En progreso',
          due_date: '2025-08-19',
          created_at: '2025-08-16T14:30:00',
          updated_at: '2025-08-17T09:15:00',
          assigned_at: '2025-08-16T15:00:00',
        },
        {
          id: 3,
          ticket_number: 'TCK-003',
          floor_id: 3,
          area_id: 1,
          end_user_id: 8,
          technician_id: 2,
          type_id: 3,
          summary: 'Solicitud de nuevo software',
          description: 'Necesito instalar Adobe Creative Suite para el proyecto de marketing digital.',
          priority: 'Baja',
          status: 'Cerrado',
          due_date: '2025-08-25',
          created_at: '2025-08-15T11:20:00',
          updated_at: '2025-08-17T08:45:00',
          assigned_at: '2025-08-15T12:00:00',
          resolved_at: '2025-08-17T08:45:00',
          closed_at: '2025-08-17T08:45:00',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'abierto': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en progreso': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cerrado': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status.toLowerCase()) {
      case 'abierto': return <AlertCircle className="w-4 h-4" />;
      case 'en progreso': return <Clock className="w-4 h-4" />;
      case 'cerrado': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const filteredTickets = tickets.filter((ticket: Ticket) => {
    const matchesSearch = ticket.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority.toLowerCase() === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return {
    tickets,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    viewMode,
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
  };
}

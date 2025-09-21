
import { useState, useEffect } from 'react';
import { Appointment } from '../types';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from storage or API
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // In a real app, this would load from AsyncStorage or API
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        clientName: 'Marie Dubois',
        clientPhone: '+33 6 12 34 56 78',
        hairstyleId: '1',
        date: '2024-01-15',
        time: '10:00',
        location: 'salon',
        status: 'confirmed',
        paymentStatus: 'deposit',
        totalPrice: 80,
        notes: 'Première fois, préfère les tresses pas trop serrées'
      },
      {
        id: '2',
        clientName: 'Sophie Martin',
        clientPhone: '+33 6 98 76 54 32',
        hairstyleId: '3',
        date: '2024-01-16',
        time: '14:00',
        location: 'home',
        status: 'pending',
        paymentStatus: 'none',
        totalPrice: 90
      }
    ];
    setAppointments(mockAppointments);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
    console.log('New appointment added:', newAppointment);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    );
    console.log('Appointment updated:', id, updates);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    console.log('Appointment deleted:', id);
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
};

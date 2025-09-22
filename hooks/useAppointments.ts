
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
        clientName: 'Aminata Diallo',
        clientPhone: '+33 6 12 34 56 78',
        hairstyleId: '6', // Goddess Braids
        date: '2024-01-18',
        time: '09:00',
        location: 'salon',
        status: 'confirmed',
        paymentStatus: 'deposit',
        totalPrice: 75,
        notes: 'Souhaite des tresses volumineuses pour un mariage'
      },
      {
        id: '2',
        clientName: 'Fatou Keita',
        clientPhone: '+33 6 98 76 54 32',
        hairstyleId: '1', // Box Braids
        date: '2024-01-19',
        time: '14:00',
        location: 'home',
        status: 'pending',
        paymentStatus: 'none',
        totalPrice: 80,
        notes: 'Première fois, préfère les tresses moyennes'
      },
      {
        id: '3',
        clientName: 'Aïcha Traoré',
        clientPhone: '+33 6 45 67 89 12',
        hairstyleId: '4', // Fulani Braids
        date: '2024-01-20',
        time: '10:30',
        location: 'salon',
        status: 'confirmed',
        paymentStatus: 'full',
        totalPrice: 100,
        notes: 'Veut des perles dorées et des accessoires traditionnels'
      },
      {
        id: '4',
        clientName: 'Mariam Coulibaly',
        clientPhone: '+33 6 23 45 67 89',
        hairstyleId: '8', // Knotless Braids
        date: '2024-01-21',
        time: '08:00',
        location: 'salon',
        status: 'confirmed',
        paymentStatus: 'deposit',
        totalPrice: 110,
        notes: 'Cheveux sensibles, technique douce requise'
      },
      {
        id: '5',
        clientName: 'Kadiatou Bah',
        clientPhone: '+33 6 34 56 78 90',
        hairstyleId: '3', // Senegalese Twists
        date: '2024-01-22',
        time: '13:00',
        location: 'home',
        status: 'pending',
        paymentStatus: 'none',
        totalPrice: 90,
        notes: 'Préfère les torsades longues et fines'
      },
      {
        id: '6',
        clientName: 'Ndeye Sow',
        clientPhone: '+33 6 56 78 90 12',
        hairstyleId: '6', // Goddess Braids
        date: '2024-01-23',
        time: '15:30',
        location: 'salon',
        status: 'completed',
        paymentStatus: 'full',
        totalPrice: 75,
        notes: 'Cliente régulière, très satisfaite du résultat'
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

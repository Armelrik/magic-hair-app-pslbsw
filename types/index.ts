
export interface Hairstyle {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  packetsNeeded: number;
  imageUrl: string;
  category: 'braids' | 'twists' | 'locs' | 'protective';
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  hairstyleId: string;
  date: string;
  time: string;
  location: 'home' | 'salon';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'none' | 'deposit' | 'full';
  totalPrice: number;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  appointments: Appointment[];
}

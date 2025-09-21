
import { DaySchedule, TimeSlot } from '../types';

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: Math.random() > 0.3 // 70% chance of being available
    });
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:30`,
      available: Math.random() > 0.3
    });
  }
  
  return slots;
};

const generateScheduleForDays = (days: number): DaySchedule[] => {
  const schedule: DaySchedule[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    schedule.push({
      date: date.toISOString().split('T')[0],
      slots: generateTimeSlots()
    });
  }
  
  return schedule;
};

export const schedule = generateScheduleForDays(30); // Generate 30 days of schedule

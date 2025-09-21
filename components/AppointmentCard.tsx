
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appointment } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';
import { hairstyles } from '../data/hairstyles';
import Icon from './Icon';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export default function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const hairstyle = hairstyles.find(h => h.id === appointment.hairstyleId);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'completed': return colors.textLight;
      case 'cancelled': return colors.error;
      default: return colors.textLight;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'none': return 'Non payé';
      case 'deposit': return 'Acompte versé';
      case 'full': return 'Payé intégralement';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.clientName}>{appointment.clientName}</Text>
          <Text style={styles.hairstyleName}>{hairstyle?.name || 'Coiffure inconnue'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{formatDate(appointment.date)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="time-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name={appointment.location === 'home' ? 'home-outline' : 'storefront-outline'} size={16} color={colors.textLight} />
          <Text style={styles.detailText}>
            {appointment.location === 'home' ? 'À domicile' : 'Au salon'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="card-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{getPaymentStatusText(appointment.paymentStatus)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.phone}>{appointment.clientPhone}</Text>
        <Text style={styles.price}>{appointment.totalPrice}€</Text>
      </View>

      {appointment.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notes}>{appointment.notes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  hairstyleName: {
    fontSize: 14,
    color: colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phone: {
    fontSize: 14,
    color: colors.textLight,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
  },
});


import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { hairstyles } from '../data/hairstyles';
import { schedule } from '../data/schedule';
import { useAppointments } from '../hooks/useAppointments';
import Icon from '../components/Icon';

export default function BookingScreen() {
  const { hairstyleId } = useLocalSearchParams<{ hairstyleId: string }>();
  const { addAppointment } = useAppointments();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState<'home' | 'salon'>('salon');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const hairstyle = hairstyles.find(h => h.id === hairstyleId);

  if (!hairstyle) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.content, commonStyles.center]}>
          <Text style={commonStyles.text}>Coiffure non trouvée</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !clientName || !clientPhone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const appointment = {
      clientName,
      clientPhone,
      hairstyleId: hairstyle.id,
      date: selectedDate,
      time: selectedTime,
      location,
      status: 'pending' as const,
      paymentStatus: 'none' as const,
      totalPrice: hairstyle.price,
      notes: notes || undefined,
    };

    addAppointment(appointment);
    
    Alert.alert(
      'Réservation confirmée',
      `Votre rendez-vous pour ${hairstyle.name} a été enregistré pour le ${new Date(selectedDate).toLocaleDateString('fr-FR')} à ${selectedTime}.`,
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const availableDates = schedule.slice(0, 7); // Next 7 days

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réserver</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.hairstyleInfo}>
          <Text style={styles.hairstyleName}>{hairstyle.name}</Text>
          <Text style={styles.hairstylePrice}>{hairstyle.price}€</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir une date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {availableDates.map((day) => {
              const date = new Date(day.date);
              const isSelected = selectedDate === day.date;
              
              return (
                <TouchableOpacity
                  key={day.date}
                  style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text style={[styles.dayName, isSelected && styles.selectedText]}>
                    {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choisir un horaire</Text>
            <View style={styles.timeGrid}>
              {schedule.find(d => d.date === selectedDate)?.slots
                .filter(slot => slot.available)
                .map((slot) => (
                  <TouchableOpacity
                    key={slot.time}
                    style={[
                      styles.timeSlot,
                      selectedTime === slot.time && styles.selectedTimeSlot
                    ]}
                    onPress={() => setSelectedTime(slot.time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === slot.time && styles.selectedText
                    ]}>
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lieu</Text>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={[styles.locationOption, location === 'salon' && styles.selectedLocation]}
              onPress={() => setLocation('salon')}
            >
              <Icon name="storefront-outline" size={24} color={location === 'salon' ? colors.primary : colors.textLight} />
              <Text style={[styles.locationText, location === 'salon' && styles.selectedLocationText]}>
                Au salon
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.locationOption, location === 'home' && styles.selectedLocation]}
              onPress={() => setLocation('home')}
            >
              <Icon name="home-outline" size={24} color={location === 'home' ? colors.primary : colors.textLight} />
              <Text style={[styles.locationText, location === 'home' && styles.selectedLocationText]}>
                À domicile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations client</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nom complet *</Text>
            <TextInput
              style={commonStyles.input}
              value={clientName}
              onChangeText={setClientName}
              placeholder="Votre nom et prénom"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Téléphone *</Text>
            <TextInput
              style={commonStyles.input}
              value={clientPhone}
              onChangeText={setClientPhone}
              placeholder="+33 6 12 34 56 78"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes (optionnel)</Text>
            <TextInput
              style={[commonStyles.input, styles.notesInput]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Précisions, préférences..."
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[buttonStyles.primary, styles.bookButton]}
          onPress={handleBooking}
        >
          <Text style={buttonStyles.text}>Confirmer la réservation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hairstyleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hairstyleName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  hairstylePrice: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  dateScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dateCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedDateCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayName: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  selectedText: {
    color: colors.background,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  locationOption: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedLocation: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    marginTop: 8,
  },
  selectedLocationText: {
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  bookButton: {
    marginVertical: 20,
  },
});

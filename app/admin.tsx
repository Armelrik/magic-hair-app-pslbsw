
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { useAppointments } from '../hooks/useAppointments';
import AppointmentCard from '../components/AppointmentCard';
import Icon from '../components/Icon';

export default function AdminScreen() {
  const { appointments } = useAppointments();
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'confirmed' || apt.status === 'pending'
  );

  const todayRevenue = appointments
    .filter(apt => apt.date === new Date().toISOString().split('T')[0] && apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.totalPrice, 0);

  const monthlyRevenue = appointments
    .filter(apt => {
      const aptDate = new Date(apt.date);
      const now = new Date();
      return aptDate.getMonth() === now.getMonth() && 
             aptDate.getFullYear() === now.getFullYear() &&
             apt.status === 'completed';
    })
    .reduce((sum, apt) => sum + apt.totalPrice, 0);

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="calendar-outline" size={24} color={colors.primary} />
          <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
          <Text style={styles.statLabel}>RDV à venir</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="cash-outline" size={24} color={colors.success} />
          <Text style={styles.statNumber}>{todayRevenue}€</Text>
          <Text style={styles.statLabel}>Aujourd&apos;hui</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="trending-up-outline" size={24} color={colors.accent} />
          <Text style={styles.statNumber}>{monthlyRevenue}€</Text>
          <Text style={styles.statLabel}>Ce mois</Text>
        </View>
      </View>

      <View style={commonStyles.section}>
        <Text style={commonStyles.subtitle}>Prochains rendez-vous</Text>
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>Aucun rendez-vous à venir</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderCalendar = () => (
    <View style={styles.content}>
      <Text style={commonStyles.subtitle}>Gestion du calendrier</Text>
      <View style={styles.comingSoon}>
        <Icon name="construct-outline" size={48} color={colors.textLight} />
        <Text style={styles.comingSoonText}>Fonctionnalité en développement</Text>
        <Text style={styles.comingSoonSubtext}>
          Bientôt vous pourrez gérer vos créneaux disponibles
        </Text>
      </View>
    </View>
  );

  const renderCatalog = () => (
    <View style={styles.content}>
      <Text style={commonStyles.subtitle}>Gestion du catalogue</Text>
      <View style={styles.comingSoon}>
        <Icon name="construct-outline" size={48} color={colors.textLight} />
        <Text style={styles.comingSoonText}>Fonctionnalité en développement</Text>
        <Text style={styles.comingSoonSubtext}>
          Bientôt vous pourrez ajouter et modifier vos coiffures
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Magic Hair Admin</Text>
          <Text style={styles.subtitle}>Tableau de bord</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/')}
        >
          <Icon name="log-out-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Tableau de bord
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
          onPress={() => setActiveTab('calendar')}
        >
          <Text style={[styles.tabText, activeTab === 'calendar' && styles.activeTabText]}>
            Calendrier
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'catalog' && styles.activeTab]}
          onPress={() => setActiveTab('catalog')}
        >
          <Text style={[styles.tabText, activeTab === 'catalog' && styles.activeTabText]}>
            Catalogue
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'catalog' && renderCatalog()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  logoutButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.background,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 16,
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 16,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});

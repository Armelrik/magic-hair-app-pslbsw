
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { hairstyles } from '../data/hairstyles';
import HairstyleCard from '../components/HairstyleCard';
import BottomNavigation from '../components/BottomNavigation';
import Icon from '../components/Icon';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'braids', label: 'Tresses' },
    { id: 'twists', label: 'Torsades' },
    { id: 'locs', label: 'Locs' },
    { id: 'protective', label: 'Protecteur' },
  ];

  const filteredHairstyles = selectedCategory === 'all' 
    ? hairstyles 
    : hairstyles.filter(h => h.category === selectedCategory);

  const renderCatalog = () => (
    <ScrollView style={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Magic Hair</Text>
          <Text style={styles.subtitle}>Découvrez nos coiffures</Text>
        </View>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/login')}
        >
          <Icon name="settings-outline" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.selectedCategoryChip
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.hairstylesContainer}>
        {filteredHairstyles.map((hairstyle) => (
          <HairstyleCard
            key={hairstyle.id}
            hairstyle={hairstyle}
            onPress={() => router.push(`/booking?hairstyleId=${hairstyle.id}`)}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderBooking = () => (
    <View style={styles.content}>
      <Text style={styles.pageTitle}>Réserver un rendez-vous</Text>
      <View style={styles.comingSoon}>
        <Icon name="calendar-outline" size={48} color={colors.textLight} />
        <Text style={styles.comingSoonText}>Sélectionnez une coiffure</Text>
        <Text style={styles.comingSoonSubtext}>
          Allez dans le catalogue et choisissez votre coiffure préférée pour réserver
        </Text>
        <TouchableOpacity
          style={styles.goToCatalogButton}
          onPress={() => setActiveTab('catalog')}
        >
          <Text style={styles.goToCatalogText}>Voir le catalogue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAppointments = () => (
    <View style={styles.content}>
      <Text style={styles.pageTitle}>Mes rendez-vous</Text>
      <View style={styles.comingSoon}>
        <Icon name="list-outline" size={48} color={colors.textLight} />
        <Text style={styles.comingSoonText}>Fonctionnalité en développement</Text>
        <Text style={styles.comingSoonSubtext}>
          Bientôt vous pourrez voir l&apos;historique de vos rendez-vous
        </Text>
      </View>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.content}>
      <Text style={styles.pageTitle}>Mon profil</Text>
      <View style={styles.comingSoon}>
        <Icon name="person-outline" size={48} color={colors.textLight} />
        <Text style={styles.comingSoonText}>Fonctionnalité en développement</Text>
        <Text style={styles.comingSoonSubtext}>
          Bientôt vous pourrez gérer votre profil et vos préférences
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      {activeTab === 'catalog' && renderCatalog()}
      {activeTab === 'booking' && renderBooking()}
      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'profile' && renderProfile()}
      
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  adminButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  selectedCategoryText: {
    color: colors.background,
  },
  hairstylesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 16,
    textAlign: 'center',
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  goToCatalogButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  goToCatalogText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

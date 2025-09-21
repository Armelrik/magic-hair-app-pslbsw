
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const tabs = [
    { id: 'catalog', label: 'Catalogue', icon: 'grid-outline' },
    { id: 'booking', label: 'Réserver', icon: 'calendar-outline' },
    { id: 'appointments', label: 'RDV', icon: 'list-outline' },
    { id: 'profile', label: 'Profil', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === tab.id ? colors.primary : colors.textLight }
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.bottomNav,
  },
  tab: {
    ...commonStyles.bottomNavItem,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

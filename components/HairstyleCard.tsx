
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Hairstyle } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface HairstyleCardProps {
  hairstyle: Hairstyle;
  onPress: () => void;
}

export default function HairstyleCard({ hairstyle, onPress }: HairstyleCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}min`;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: hairstyle.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{hairstyle.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {hairstyle.description}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{formatDuration(hairstyle.duration)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="cube-outline" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{hairstyle.packetsNeeded} paquets</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{hairstyle.price}€</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{hairstyle.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  categoryBadge: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
});

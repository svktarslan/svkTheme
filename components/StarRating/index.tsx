import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { staticColors } from '../../hooks/useTheme';
import Style from './styles';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
  style?: ViewStyle | ViewStyle[];
  spacing?: number;
}

const StarRating = ({ rating, size = 16, color = staticColors.warning, style, spacing = 2 }: StarRatingProps) => {
  const styles = Style({ spacing });

  const normalizedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={size} color={color} style={styles.star} />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={size} color={color} style={styles.star} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={size} color={color} style={styles.star} />);
    }
    return stars;
  };

  return <View style={[styles.container, style]}>{renderStars()}</View>;
};

export default memo(StarRating);



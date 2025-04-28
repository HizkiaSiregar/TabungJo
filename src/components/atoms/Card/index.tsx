// src/components/atoms/Card/index.js
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children, style, variant = 'filled', opacity = 1 }) => {
  return (
    <View 
      style={[
        styles.card, 
        variant === 'stroke' && styles.strokeCard,
        { opacity: opacity },
        style
      ]}
    >
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  strokeCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
// src/components/atoms/Button2/index.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button2 = ({ 
  label, 
  color = '#FBC028', 
  textColor = '#000000', 
  onPress,
  style
}) => {
  return (
    <TouchableOpacity
      style={[styles.button(color), style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.label(textColor)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button2;

const styles = StyleSheet.create({
  button: (color) => ({
    backgroundColor: color,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 19,
    height: 53,
    width: 372,
  }),
  label: (textColor) => ({
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: textColor,
    textAlign: 'center',
    lineHeight: 20,
  }),
});
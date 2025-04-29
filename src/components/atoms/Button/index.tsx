// src/components/atoms/Button/index.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({label, color = '#FBC028', textColor = '#000000', onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[styles.label, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 311,
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
});
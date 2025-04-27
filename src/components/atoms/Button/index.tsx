import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor = '#F9B233', textColor = '#000000', style }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;

// src/components/molecules/FormInput/index.js
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    marginBottom: 6,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0F3E48',
    borderRadius: 0,
    padding: 10,
    height: 46,
    fontFamily: 'Inter-Regular',
  },
});
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
    width: '100%',
    alignSelf: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    marginBottom: 6,
    color: '#000000',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#0F3E48',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});
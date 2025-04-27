import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const AddSavings = () => {
  const [saving, setSaving] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Savings</Text>

      <View style={styles.card}>
        <Text style={styles.productTitle}>Iphone 21 Pro max</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Target : 20.000</Text>
          <Text style={styles.infoText}>Stored : -</Text>
        </View>

        <Text style={styles.label}>Add Saving (Rp)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={saving}
          onChangeText={setSaving}
        />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnButton}>
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddSavings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#03363D',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  returnButton: {
    backgroundColor: '#FFC727',
    paddingVertical: 12,
    borderRadius: 5,
  },
  returnButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// src/pages/AddSavings/index.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, Gap } from '../../components/atoms';
import { Header, FormInput } from '../../components/molecules';

const AddSavings = ({ navigation, route }) => {
  // In a real app, you would get the goal data from route.params
  // For demo purposes, we'll use sample data
  const goalName = 'Iphone 21 Pro max';
  const targetAmount = '20000';
  const currentSaved = '5000'; // This would come from actual data
  
  const [amount, setAmount] = useState('');

  const handleAddSaving = () => {
    console.log('Adding Savings:', {
      goalName,
      amount
    });
    
    // In a real app, you would update this in state/context/backend
    // Then navigate back to Home screen
    navigation.navigate('HomeWithGoals');
  };

  const handleReturn = () => {
    navigation.navigate('HomeWithGoals');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Add Savings" />
        
        <View style={styles.content}>
          <View style={styles.goalInfoContainer}>
            <Text style={styles.goalName}>{goalName}</Text>
            
            <Gap height={10} />
            
            <View style={styles.targetInfoRow}>
              <Text style={styles.targetLabel}>Target : </Text>
              <Text style={styles.targetValue}>{targetAmount}</Text>
            </View>
            
            <View style={styles.targetInfoRow}>
              <Text style={styles.targetLabel}>Stored : </Text>
              <Text style={styles.targetValue}>{currentSaved}</Text>
            </View>
          </View>
          
          <Gap height={30} />
          
          <FormInput
            label="Add Saving (Rp)"
            placeholder="Enter amount to add"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
          
          <Gap height={30} />
          
          <Button 
            label="Add"
            onPress={handleAddSaving}
            color="#0F3E48"
            textColor="#FFFFFF"
          />
          
          <Gap height={15} />
          
          <Button 
            label="Return"
            onPress={handleReturn}
            color="#FBC028"
            textColor="#000000"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSavings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  goalInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  targetInfoRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  targetLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  targetValue: {
    fontSize: 18,
  },
});
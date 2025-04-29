// src/pages/AddGoals/index.js
import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {Header, FormInput} from '../../components/molecules';

const AddGoals = ({navigation}) => {
  console.log('Rendering AddGoals');
  
  const handleAddGoal = () => {
    console.log('Add goal');
    // Add goal logic would go here
    
    // Navigate back to home
    navigation.navigate('HomeEmpty');
  };
  
  const handleCancel = () => {
    console.log('Cancel add goal');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Add Goals" />
        
        <View style={styles.content}>
          <Gap height={20} />
          
          <FormInput
            label="Goal Name"
            placeholder="Enter your goal name"
          />
          
          <FormInput
            label="Nominal Target (Rp)"
            placeholder="Enter target amount"
            keyboardType="numeric"
          />
          
          <FormInput
            label="Deadline Date"
            placeholder="Select deadline date"
          />
          
          <FormInput
            label="Initial Savings (Optional)"
            placeholder="Enter initial amount"
            keyboardType="numeric"
          />
          
          <Gap height={20} />
          
          <Button 
            label="Add Goal"
            onPress={handleAddGoal}
            color="#0F3E48"
            textColor="#FFFFFF"
          />
          
          <Gap height={15} />
          
          <Button 
            label="Cancel Goal"
            onPress={handleCancel}
            color="#FBC028"
            textColor="#000000"
          />
          
          <Gap height={30} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGoals;

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
});
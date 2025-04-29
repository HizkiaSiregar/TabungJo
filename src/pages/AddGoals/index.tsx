import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Button, Gap } from '../../components/atoms';
import { Header, FormInput } from '../../components/molecules';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddGoals = ({ navigation }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [initialSaving, setInitialSaving] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddGoal = () => {
    // Automatically add default values if fields are left blank
    console.log('Goal Added:', {
      name: goalName || 'Unnamed Goal',
      targetAmount: targetAmount || '0',
      deadline: deadline.toISOString().split('T')[0],
      initialSaving: initialSaving || '0',
    });

    // Navigate to HomeWithGoals after adding goal
    navigation.replace('HomeWithGoals');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    
    // For Android, hide the picker after selection
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    setDeadline(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
            value={goalName}
            onChangeText={setGoalName}
          />
          
          <FormInput
            label="Nominal Target (Rp)"
            placeholder="Enter target amount"
            value={targetAmount}
            onChangeText={(text) => setTargetAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
          
          <FormInput
            label="Deadline Date"
            placeholder="Select deadline date"
            value={formatDate(deadline)}
            editable={false}
            onTouchStart={showDatepicker}
          />
          
          {(showDatePicker && Platform.OS === 'ios') && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          
          {(showDatePicker && Platform.OS === 'android') && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          
          <FormInput
            label="Initial Savings (Optional)"
            placeholder="Enter initial amount"
            value={initialSaving}
            onChangeText={(text) => setInitialSaving(text.replace(/[^0-9]/g, ''))}
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

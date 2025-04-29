// src/pages/EditGoals/index.js
import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {Header, FormInput} from '../../components/molecules';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditGoals = ({navigation, route}) => {
  // In a real app, you would get the goal data from route.params
  // For demo purposes, we'll use sample data
  const [goalName, setGoalName] = useState('Iphone 21 Pro max');
  const [targetAmount, setTargetAmount] = useState('20000');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveEdit = () => {
    console.log('Goal Updated:', {
      name: goalName,
      targetAmount,
      deadline: deadline.toISOString().split('T')[0],
    });

    // In a real app, you would update this in state/context/backend
    // Then navigate back to Home screen
    navigation.navigate('HomeWithGoals');
  };

  const handleDelete = () => {
    // Navigate to confirm delete screen
    navigation.navigate('ConfirmDeleteGoal');
  };

  const handleCancel = () => {
    navigation.navigate('HomeEmpty');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Edit Goal" />

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
            onChangeText={text => setTargetAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />

          <FormInput
            label="Deadline Date"
            placeholder="Select deadline date"
            value={formatDate(deadline)}
            editable={false}
            onTouchStart={showDatepicker}
          />

          {showDatePicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Gap height={20} />

          <Button
            label="Save Edit"
            onPress={handleSaveEdit}
            color="#0F3E48"
            textColor="#FFFFFF"
          />

          <Gap height={15} />

          <Button
            label="Delete Goal"
            onPress={handleDelete}
            color="#77A6B6"
            textColor="#000000"
          />

          <Gap height={15} />

          <Button
            label="Cancel Edit"
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

export default EditGoals;

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

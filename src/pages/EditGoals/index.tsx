import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {Header, FormInput} from '../../components/molecules';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditGoals = ({navigation, route}) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState(null); // Awalnya null
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveEdit = () => {
    console.log('Goal Updated:', {
      name: goalName,
      targetAmount,
      deadline: deadline ? deadline.toISOString().split('T')[0] : null,
    });
    navigation.navigate('HomeWithGoals');
  };

  const handleDelete = () => {
    navigation.navigate('ConfirmDeleteGoal');
  };

  const handleCancel = () => {
    navigation.navigate('HomeWithGoals');
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
    return date ? date.toISOString().split('T')[0] : '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Edit Goal" />

        <View style={styles.content}>
          <Gap height={20} />

          <FormInput
            label="Goal Name"
            placeholder=""
            value={goalName}
            onChangeText={setGoalName}
          />

          <FormInput
            label="Nominal Target"
            placeholder=""
            value={targetAmount}
            onChangeText={text => setTargetAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />

          <FormInput
            label="Deadline Date"
            placeholder=""
            value={formatDate(deadline)}
            editable={false}
            onTouchStart={showDatepicker}
          />

          {showDatePicker && (
            <DateTimePicker
              value={deadline || new Date()}
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
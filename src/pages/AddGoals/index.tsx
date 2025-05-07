import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button, Gap } from '../../components/atoms';
import { Header, FormInput } from '../../components/molecules';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';
import { createGoal } from '../../services/firebase';
import { showMessage } from 'react-native-flash-message';

const AddGoals = ({ navigation }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [initialSaving, setInitialSaving] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddGoal = async () => {
    if (!goalName || !targetAmount) {
      showMessage({
        message: 'Goal name and target amount are required',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        navigation.replace('SignIn');
        return;
      }

      const goalData = {
        name: goalName,
        targetAmount,
        deadline: deadline ? deadline.toISOString() : null,
        initialSaving: initialSaving || '0',
      };

      await createGoal(user.uid, goalData);

      showMessage({
        message: 'Goal created successfully',
        type: 'success',
      });

      navigation.replace('HomeWithGoals');
    } catch (error) {
      showMessage({
        message: 'Failed to create goal',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) setDeadline(selectedDate);
  };

  const showDatepicker = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
            placeholder=""
            value={goalName}
            onChangeText={setGoalName}
          />

          <FormInput
            label="Nominal Target (Rp)"
            placeholder=""
            value={targetAmount}
            onChangeText={(text) => setTargetAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.dateInputContainer} onPress={showDatepicker}>
            <Text style={styles.label}>Deadline Date</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>
                {deadline ? formatDate(deadline) : ''}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={deadline || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <FormInput
            label="Initial Savings (Optional)"
            placeholder=""
            value={initialSaving}
            onChangeText={(text) => setInitialSaving(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />

          <Gap height={20} />

          <Button
            label={loading ? 'Creating goal...' : 'Add Goal'}
            onPress={handleAddGoal}
            color="#0F3E48"
            textColor="#FFFFFF"
            disabled={loading}
          />

          <Gap height={15} />

          <Button
            label="Cancel"
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
  dateInputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
});

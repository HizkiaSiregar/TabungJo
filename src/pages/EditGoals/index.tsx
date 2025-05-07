import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  TouchableOpacity,
  Keyboard 
} from 'react-native';
import { Button, Gap } from '../../components/atoms';
import { Header, FormInput } from '../../components/molecules';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { updateGoal } from '../../services/firebase';
import { showMessage } from 'react-native-flash-message';

const EditGoals = ({ navigation, route }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const { goalId } = route.params;
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          navigation.replace('SignIn');
          return;
        }
        
        const db = getDatabase();
        const goalRef = ref(db, `users/${user.uid}/goals/${goalId}`);
        const snapshot = await get(goalRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          setGoalName(data.name || '');
          setTargetAmount(data.targetAmount || '');
          
          if (data.deadline) {
            setDeadline(new Date(data.deadline));
          }
        } else {
          showMessage({
            message: 'Goal not found',
            type: 'danger',
          });
          navigation.goBack();
        }
      } catch (error) {
        showMessage({
          message: 'Error loading goal data',
          description: error.message,
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGoalData();
  }, [navigation, route.params]);

  const handleSaveEdit = async () => {
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
      
      const { goalId } = route.params;
      
      const updatedData = {
        name: goalName,
        targetAmount: targetAmount,
        deadline: deadline ? deadline.toISOString() : null,
      };
      
      await updateGoal(user.uid, goalId, updatedData);
      
      showMessage({
        message: 'Goal updated successfully',
        type: 'success',
      });
      
      navigation.navigate('HomeWithGoals');
    } catch (error) {
      showMessage({
        message: 'Failed to update goal',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    navigation.navigate('ConfirmDeleteGoal', {
      goalId: route.params.goalId,
    });
  };

  const handleCancel = () => {
    navigation.navigate('HomeWithGoals');
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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Edit Goal" />
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          
          {/* Date Picker Component */}
          <TouchableOpacity style={styles.dateInputContainer} onPress={showDatepicker}>
            <Text style={styles.label}>Deadline Date</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>
                {deadline ? formatDate(deadline) : 'Select a date'}
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
          
          <Gap height={20} />
          <Button
            label={loading ? "Saving changes..." : "Save Edit"}
            onPress={handleSaveEdit}
            color="#0F3E48"
            textColor="#FFFFFF"
            disabled={loading}
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
  dateInputContainer: {
    marginTop: 20,
    marginBottom: 20,
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
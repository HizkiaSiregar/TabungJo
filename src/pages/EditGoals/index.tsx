import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Platform, Text} from 'react-native';
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
});
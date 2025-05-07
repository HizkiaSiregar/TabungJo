import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, Gap } from '../../components/atoms';
import { Header, FormInput } from '../../components/molecules';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { addSaving } from '../../services/firebase';
import { showMessage } from 'react-native-flash-message';

const AddSavings = ({ navigation, route }) => {
  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: '0',
  });
  const [amount, setAmount] = useState('');
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
          setGoalData({
            name: data.name,
            targetAmount: data.targetAmount,
            savedAmount: data.savedAmount || '0',
          });
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

  const handleAddSaving = async () => {
    if (!amount || parseInt(amount, 10) <= 0) {
      showMessage({
        message: 'Please enter a valid amount',
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
      
      const result = await addSaving(user.uid, goalId, amount);
      
      showMessage({
        message: 'Saving added successfully',
        description: `New saved amount: ${result.newAmount}`,
        type: 'success',
      });
      
      navigation.navigate('HomeWithGoals');
    } catch (error) {
      showMessage({
        message: 'Failed to add saving',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    navigation.navigate('HomeWithGoals');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Add Savings" />
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Add Savings" />
        <View style={styles.content}>
          <View style={styles.goalInfoContainer}>
            <Text style={styles.goalName}>{goalData.name}</Text>
            <Gap height={10} />
            <View style={styles.targetInfoRow}>
              <Text style={styles.targetLabel}>Target : </Text>
              <Text style={styles.targetValue}>{goalData.targetAmount}</Text>
            </View>
            <View style={styles.targetInfoRow}>
              <Text style={styles.targetLabel}>Stored : </Text>
              <Text style={styles.targetValue}>{goalData.savedAmount}</Text>
            </View>
          </View>
          <Gap height={30} />
          <FormInput
            label="Add Saving (Rp)"
            placeholder=""
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
          <Gap height={30} />
          <Button
            label={loading ? "Adding..." : "Add"}
            onPress={handleAddSaving}
            color="#0F3E48"
            textColor="#FFFFFF"
            disabled={loading}
          />
          <Gap height={15} />
          <Button
            label="Cancel"
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
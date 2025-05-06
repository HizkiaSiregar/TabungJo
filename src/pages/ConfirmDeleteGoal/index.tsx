import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Gap } from '../../components/atoms';
import { getAuth } from 'firebase/auth';
import { deleteGoal } from '../../services/firebase';
import { showMessage } from 'react-native-flash-message';

const ConfirmDeleteGoal = ({ navigation, route }) => {
  const handleConfirm = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        navigation.replace('SignIn');
        return;
      }
      
      const { goalId } = route.params;
      
      await deleteGoal(user.uid, goalId);
      
      showMessage({
        message: 'Goal deleted successfully',
        type: 'success',
      });
      
      navigation.navigate('HomeWithGoals');
    } catch (error) {
      showMessage({
        message: 'Failed to delete goal',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Goal</Text>
        </View>
        {/* Overlay for dimming background */}
        <View style={styles.overlay} />
        {/* Confirmation Dialog */}
        <View style={styles.dialogContainer}>
          <View style={styles.dialogContent}>
            <Text style={styles.message}>
              <Text style={styles.normalText}>This action will </Text>
              <Text style={styles.boldText}>permanently delete </Text>
              <Text style={styles.boldText}>this savings goal </Text>
              <Text style={styles.normalText}>
                and all related data.
              </Text>
            </Text>
            <Gap height={10} />
            <Text style={styles.message}>
              <Text style={styles.normalText}>This action </Text>
              <Text style={styles.boldText}>cannot be undone.</Text>
            </Text>
            <Gap height={10} />
            <Text style={styles.message}>
              <Text style={styles.normalText}>Are you sure you want to proceed?</Text>
            </Text>
            <Gap height={20} />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Gap width={10} />
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmDeleteGoal;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingLeft: 24,
    paddingVertical: 38,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 40,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#000000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  dialogContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    padding: 20,
  },
  dialogContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  normalText: {
    fontWeight: '400',
  },
  boldText: {
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 53,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#77A6B6',
  },
  confirmButton: {
    backgroundColor: '#0F3E48',
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
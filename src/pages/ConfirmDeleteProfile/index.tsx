// src/pages/ConfirmDeleteProfile/index.js
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Gap} from '../../components/atoms';
import {Header} from '../../components/molecules';

const ConfirmDeleteProfile = ({navigation}) => {
  console.log('Rendering ConfirmDeleteProfile');
  
  const handleConfirm = () => {
    console.log('Confirm data reset');
    // Reset data logic would go here
    
    // Navigate back to profile
    navigation.navigate('SignIn');
  };

  const handleCancel = () => {
    console.log('Cancel data reset');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Profile" />
        
        {/* Overlay for dimming background */}
        <View style={styles.overlay} />
        
        {/* Confirmation Dialog */}
        <View style={styles.dialogContainer}>
          <View style={styles.dialogContent}>
            <Text style={styles.message}>
              <Text style={styles.normalText}>This action will </Text>
              <Text style={styles.boldText}>permanently delete </Text>
              <Text style={styles.boldText}>all your savings data </Text>
              <Text style={styles.normalText}>
                and reset the app as if it's your first time using it.
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
                <Text style={styles.buttonText}>Cancel</Text>
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

export default ConfirmDeleteProfile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  buttonText: {
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
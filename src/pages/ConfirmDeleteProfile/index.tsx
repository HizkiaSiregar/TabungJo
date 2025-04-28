// src/pages/ConfirmDeleteProfile/index.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/molecules';
import { ConfirmDialog } from '../../components/molecules';

const ConfirmDeleteProfile = ({ navigation }) => {
  const confirmMessage = (
    <React.Fragment>
      <span style={{ fontWeight: 'normal' }}>This action will </span>
      <span style={{ fontWeight: 'bold' }}>permanently delete </span>
      <span style={{ fontWeight: 'bold' }}>all your savings data </span>
      <span style={{ fontWeight: 'normal' }}>
        and reset the app as if it's your first time using it.
        {'\n'}
        This action{' '}
      </span>
      <span style={{ fontWeight: 'bold' }}>
        cannot be undone.
        {'\n'}
      </span>
      <span style={{ fontWeight: 'normal' }}>Are you sure you want to proceed?</span>
    </React.Fragment>
  );

  const handleConfirm = () => {
    // Reset data logic here
    
    // Navigate back to profile
    navigation.navigate('Profile');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ConfirmDialog 
        message={confirmMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default ConfirmDeleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
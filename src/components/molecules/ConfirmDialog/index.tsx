// src/components/molecules/ConfirmDialog/index.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from '../../atoms';

const ConfirmDialog = ({ onConfirm, onCancel, style }) => {
  return (
    <View style={styles.overlay}>
      <Card style={[styles.dialogBox, style]}>
        <Text style={styles.messageText}>
          <Text>This action will </Text>
          <Text style={styles.boldText}>permanently delete </Text>
          <Text style={styles.boldText}>all your savings data </Text>
          <Text>and reset the app as if it's your first time using it.</Text>
          {'\n'}
          <Text>This action </Text>
          <Text style={styles.boldText}>cannot be undone.</Text>
          {'\n'}
          <Text>Are you sure you want to proceed?</Text>
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            label="Cancel"
            color="#77A6B6"
            textColor="#FFFFFF"
            style={styles.button}
            onPress={onCancel}
          />
          
          <Button 
            label="CONFIRM"
            color="#0F3E48"
            textColor="#FFFFFF"
            style={styles.button}
            onPress={onConfirm}
          />
        </View>
      </Card>
    </View>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dialogBox: {
    width: '85%',
    alignItems: 'center',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
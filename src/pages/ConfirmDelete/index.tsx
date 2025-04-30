// src/components/molecules/ConfirmDialog/index.jsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Modal
} from 'react-native';

const ConfirmDialog = ({ visible = true, onConfirm, onCancel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dialogBox}>
        <Text style={styles.message}>
          <Text style={styles.normalText}>This action will </Text>
          <Text style={styles.boldText}>permanently delete </Text>
          <Text style={styles.boldText}>all your savings data </Text>
          <Text style={styles.normalText}>
            and reset the app as if it's your first time using it.
            {'\n\n'}
            This action{' '}
          </Text>
          <Text style={styles.boldText}>
            cannot be undone.
            {'\n\n'}
          </Text>
          <Text style={styles.normalText}>Are you sure you want to proceed?</Text>
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={[styles.buttonText, styles.confirmText]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dialogBox: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
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
  },
  button: {
    width: '48%',
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
    fontWeight: '600',
    color: '#FFFFFF',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});
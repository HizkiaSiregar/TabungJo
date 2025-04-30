// src/components/molecules/ProfilePhoto/index.js
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {AccountCircle} from '../../atoms';

const ProfilePhoto = ({onPress, size = 59, color = '#77A6B6'}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AccountCircle size={size} color={color} />
    </TouchableOpacity>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  container: {
    padding: 5, // Add padding for a larger touch area
  },
});
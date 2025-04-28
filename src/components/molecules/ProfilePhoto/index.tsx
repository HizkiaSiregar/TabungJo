// src/components/molecules/ProfilePhoto/index.js
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const ProfilePhoto = ({ onPress, photoUri, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.photoContainer}>
        {photoUri ? (
          <Image 
            source={{ uri: photoUri }} 
            style={styles.photo}
            resizeMode="cover"
          />
        ) : (
          <Image 
            source={require('../../../assets/profile-placeholder.png')} 
            style={styles.placeholderImage}
            resizeMode="contain"
          />
        )}
      </View>
      <TouchableOpacity style={styles.cameraButton} onPress={onPress}>
        <Image 
          source={require('../../../assets/camera-icon.png')} 
          style={styles.cameraIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  photoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    tintColor: '#77A6B6', // This will give it the blue color if needed
  },
  cameraButton: {
    position: 'absolute',
    right: '25%',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    tintColor: '#0F3E48',
  },
});
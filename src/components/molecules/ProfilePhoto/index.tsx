import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {AccountCircle} from '../../atoms';

const ProfilePhoto = ({onPress, size = 59, color = '#77A6B6', source}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      {source ? (
        <Image source={source} style={styles.photo(size)} resizeMode="cover" />
      ) : (
        <AccountCircle size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  photo: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
});

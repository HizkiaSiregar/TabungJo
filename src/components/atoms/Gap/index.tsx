// src/components/atoms/Gap/index.js
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Gap = ({height, width}) => {
  return <View style={styles.gap(height, width)} />;
};

export default Gap;

const styles = StyleSheet.create({
  gap: (height, width) => ({
    height: height,
    width: width,
  }),
});
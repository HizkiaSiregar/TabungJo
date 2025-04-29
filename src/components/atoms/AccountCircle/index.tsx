// src/components/atoms/AccountCircle/index.js
import React from 'react';
import {View, StyleSheet} from 'react-native';

const AccountCircle = ({color = '#77A6B6', size = 59}) => {
  return (
    <View style={[styles.container, {width: size, height: size, borderRadius: size/2, backgroundColor: color}]}>
      <View style={styles.head} />
      <View style={styles.body} />
    </View>
  );
};

export default AccountCircle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  head: {
    width: '40%',
    height: '40%',
    borderRadius: 100,
    backgroundColor: 'white',
    position: 'absolute',
    top: '15%',
    zIndex: 1,
  },
  body: {
    width: '70%',
    height: '70%',
    borderRadius: 100,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-25%',
  },
});
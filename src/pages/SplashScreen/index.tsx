// src/pages/SplashScreen/index.js
import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Navigate to SignIn after 3 seconds
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/LogoTabungJo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 500,
  },
});
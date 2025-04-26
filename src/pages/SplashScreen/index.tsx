
import {StyleSheet, View, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Logo} from '../../assets'; 

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2300, 
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image source={Logo} style={[styles.logo, {opacity: fadeAnim}]} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 261,
    resizeMode: 'contain',
  },
});

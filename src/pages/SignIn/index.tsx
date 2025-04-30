// src/pages/SignIn/index.js
import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import FormInput from '../../components/molecules/FormInput';

const SignIn = ({navigation}) => {
  console.log('Rendering SignIn');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign In');
    // In a real app, you would validate credentials here
    
    // Navigate to HomeEmpty after login
    navigation.replace('HomeEmpty');
  };

  const handleSignUp = () => {
    console.log('Navigate to SignUp');
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../assets/LogoTabungJo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Gap height={30} />
        
        <View style={styles.formContainer}>
          <FormInput
            label="Username"
            placeholder=""
            value={username}
            onChangeText={setUsername}
          />
          
          <FormInput
            label="Password"
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          
          <Gap height={30} />
          
          <Button
            label="Login"
            onPress={handleSignIn}
            color="#FBC028"
            textColor="#000000"
          />
          
          <Gap height={15} />
          
          <Button
            label="Sign Up"
            onPress={handleSignUp}
            color="#0F3E48"
            textColor="#FFFFFF"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 450,
    height: 450,
    alignSelf: 'center',
    marginTop: -85,
    marginBottom: -125,
  },
  formContainer: {
    width: '100%',
  },
});
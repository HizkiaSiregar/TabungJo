// src/pages/SignUp/index.js
import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {FormInput, Header} from '../../components/molecules';

const SignUp = ({navigation}) => {
  console.log('Rendering SignUp');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign Up');
    // In a real app, you would create account here

    // Navigate to SignIn after account creation
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Sign Up" />

        <View style={styles.content}>
          <Gap height={20} />

          <FormInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <FormInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Gap height={30} />

          <Button
            label="Create Account"
            onPress={handleSignUp}
            color="#FBC028"
            textColor="#000000"
          />

          <Gap height={30} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});

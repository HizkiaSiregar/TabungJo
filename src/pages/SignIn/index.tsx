import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/LogoTabungJo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder= "" placeholderTextColor="#C4C4C4" />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C4C4C4"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#FF6F61', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: 440,
    height: 956,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 112,
  },
  logo: {
    width: 350,
    height: 350, 
    marginBottom: -50,
  },
  inputWrapper: {
    width: 320,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#F9B233', 
    width: 320,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 1,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  signupButton: {
    backgroundColor: '#003B49', 
    width: 320,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/LogoTabungJo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Input Username */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="" placeholderTextColor="#C4C4C4" />
        </View>

        {/* Input Password */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C4C4C4"
            secureTextEntry
          />
        </View>

        {/* Button Login */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Button Sign Up */}
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
    backgroundColor: '#FF6F61', // Background pink
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: 440,
    height: 956,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 112, // Logo posisi Y = 112
  },
  logo: {
    width: 350, // Sesuai figma: 350px
    height: 350, // Sesuai figma: 261px
    marginBottom: -50,
  },
  inputWrapper: {
    width: 350,
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
    backgroundColor: '#F9B233', // Kuning
    width: 350,
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
    backgroundColor: '#003B49', // Biru gelap
    width: 350,
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

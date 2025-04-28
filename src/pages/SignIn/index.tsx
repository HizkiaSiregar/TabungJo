import React from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Button from '../../components/atoms/Button'; 
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require('../../assets/LogoTabungJo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="" placeholderTextColor="#C4C4C4" />
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

        <Button
          title="Login"
          onPress={() => navigation.navigate('AddSavings' as never)}
          backgroundColor="#F9B233"
          textColor="#000000"
          style={{ marginTop: 70 }}
        />

        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp' as never)}
          backgroundColor="#003B49"
          textColor="#FFFFFF"
        />
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // ✅ fixed here, no more pink
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    width: '100%', // ✅ full width so no weird background on sides
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
});

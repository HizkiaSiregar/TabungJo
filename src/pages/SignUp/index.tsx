import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/atoms/Button'; // 👈 Import button atom

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    navigation.navigate('SignIn' as never);
  };  

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/LogoTabungJo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C4C4C4"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C4C4C4"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C4C4C4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Ganti TouchableOpacity jadi Button dari components/atoms */}
        <Button
          title="Create"
          onPress={handleCreateAccount}
          backgroundColor="#F9B233"
          textColor="#000000"
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  pageContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20, 
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: 320,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 300,
    marginBottom: -20, 
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10, 
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
});

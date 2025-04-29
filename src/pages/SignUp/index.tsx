import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView, Image} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import FormInput from '../../components/molecules/FormInput';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Gap height={20} />

          {/* Logo */}
          <Image
            source={require('../../assets/LogoTabungJo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Gap height={20} />

          {/* Form Input */}
          <FormInput
            label="Username"
            placeholder=""
            value={username}
            onChangeText={setUsername}
          />
          <FormInput
            label="Email Address"
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <FormInput
            label="Password"
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Gap height={30} />

          {/* Button */}
          <Button
            label="Create"
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
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 300,
  },
});
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Button, Gap } from '../../components/atoms';
import FormInput from '../../components/molecules/FormInput';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import '../../config/firebase';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      showMessage({
        message: 'Email dan password wajib diisi',
        type: 'danger',
      });
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        showMessage({
          message: 'Login berhasil!',
          type: 'success',
        });
        navigation.replace('HomeEmpty');
      })
      .catch(error => {
        // Mapping error Firebase ke pesan yang lebih jelas
        let friendlyMessage = '';

        switch (error.code) {
          case 'auth/user-not-found':
            friendlyMessage = 'Akun tidak ditemukan';
            break;
          case 'auth/wrong-password':
            friendlyMessage = 'Password salah';
            break;
          case 'auth/invalid-email':
            friendlyMessage = 'Format email tidak valid';
            break;
          case 'auth/too-many-requests':
            friendlyMessage =
              'Terlalu banyak percobaan login. Coba lagi nanti.';
            break;
          default:
            friendlyMessage = error.message;
        }

        showMessage({
          message: 'Login gagal',
          description: friendlyMessage,
          type: 'danger',
        });
      });
  };

  const handleSignUp = () => {
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

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Input from './components/Input';
import Button from './components/Button';

const Signin = () => {
  // let title = 'Welcome!!!'; //Variabel biasa
  const [title, setTitle] = useState('Welcome!!!'); //State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    //title = 'Selamat Datang';
    setTitle('Selamat Datang');
    console.log(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Input
        label="Username"
        placeholder="Masukan username anda"
        onChangeText={e => setUsername(e)}
      />
      <Input
        label="Password"
        placeholder="Masukan password anda"
        onChangeText={e => setPassword(e)}
        secureTextEntry={true}
      />
      <Button label="Sign In" onPress={onSubmit} />
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 40,
    color: 'black',
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

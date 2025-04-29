// src/pages/Profile/index.js
import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import FormInput from '../../components/molecules/FormInput';
import ProfilePhoto from '../../components/molecules/ProfilePhoto';

const Profile = ({navigation}) => {
  console.log('Rendering Profile');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const handleResetData = () => {
    console.log('Navigate to ConfirmDeleteProfile');
    navigation.navigate('ConfirmDeleteProfile');
  };
  
  const handleLogout = () => {
    console.log('Logging out');
    navigation.navigate('SignIn');
  };
  
  const handleReturnHome = () => {
    console.log('Returning to home');
    navigation.navigate('HomeEmpty');
  };
  
  const handleChangePhoto = () => {
    console.log('Change photo');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Profile" />
        
        <View style={styles.content}>
          {/* Profile Photo */}
          <View style={styles.photoContainer}>
            <ProfilePhoto 
              onPress={handleChangePhoto}
              size={156}
            />
          </View>
          
          <Gap height={20} />
          
          {/* Form Inputs */}
          <FormInput
            label="Username"
            placeholder=""
            value={username}
            onChangeText={setUsername}
          />
          
          <FormInput
            label="Email"
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <Gap height={20} />
          
          {/* Buttons */}
          <Button 
            label="Reset All Saving Data"
            onPress={handleResetData}
            color="#0F3E48"
            textColor="#EBECE7"
          />
          
          <Gap height={15} />
          
          <Button 
            label="Log Out"
            onPress={handleLogout}
            color="#77A6B6"
            textColor="#000000"
          />
          
          <Gap height={15} />
          
          <Button 
            label="Return to Home"
            onPress={handleReturnHome}
            color="#FBC028"
            textColor="#000000"
          />
          
          <Gap height={30} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
  photoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
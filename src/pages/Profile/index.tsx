// src/pages/Profile/index.js
import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import FormInput from '../../components/molecules/FormInput';
import ProfilePhoto from '../../components/molecules/ProfilePhoto';

const Profile = ({navigation}) => {
  // Static values that cannot be changed
  const username = 'UserTabungJo';
  const email = 'usertabungjo@example.com';
  
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
    navigation.navigate('HomeWithGoals');
  };
  
  const handleChangePhoto = () => {
    console.log('Change photo');
  };

  // Custom component to render static input
  const StaticInput = ({label, value}) => {
    return (
      <View style={styles.staticInputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.staticInputWrapper}>
          <Text style={styles.staticInput}>{value}</Text>
        </View>
      </View>
    );
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
          
          {/* Static Inputs */}
          <StaticInput label="Username" value={username} />
          <StaticInput label="Email" value={email} />
          
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
  staticInputContainer: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    marginBottom: 6,
    color: '#000000',
  },
  staticInputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#0F3E48',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  staticInput: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});
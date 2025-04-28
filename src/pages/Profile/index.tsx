// src/screens/Profile/index.js
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Gap } from '../../components/atoms';
import { Header, FormInput, ProfilePhoto } from '../../components/molecules';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const handleResetData = () => {
    navigation.navigate('ConfirmDeleteProfile');
  };
  
  const handleLogout = () => {
    // Logout logic here
  };
  
  const handleReturnHome = () => {
    // Navigate to home
  };
  
  const handleChangePhoto = () => {
    // Photo picker logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Profile" />
        
        <Card style={styles.profileCard}>
          <ProfilePhoto 
            onPress={handleChangePhoto} 
          />
          
          <FormInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          
          <FormInput
            label="Email"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <Button 
            label="Reset All Saving Data"
            color="#0F3E48"
            textColor="#FFFFFF"
            onPress={handleResetData}
          />
          
          <Gap height={15} />
          
          <Button 
            label="Log Out"
            color="#77A6B6"
            textColor="#000000"
            onPress={handleLogout}
          />
          
          <Gap height={15} />
          
          <Button 
            label="Return to Home"
            color="#FBC028"
            textColor="#000000"
            onPress={handleReturnHome}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
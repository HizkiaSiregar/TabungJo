// src/components/molecules/ProfileForm/index.tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Card} from '../../atoms';
import {TextInput} from '../../molecules';

const ProfileForm = ({
  username,
  email,
  onChangeUsername,
  onChangeEmail,
  onResetData,
  onLogout,
  onReturnHome,
}) => {
  return (
    <Card variant="stroke" opacity={0.3} style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={onChangeUsername}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
        />

        <Button
          label="Reset All Saving Data"
          color="#0F3E48"
          textColor="#EBECE7"
          onPress={onResetData}
        />

        <Gap height={15} />

        <Button
          label="Log Out"
          color="#77A6B6"
          textColor="#000000"
          onPress={onLogout}
        />

        <Gap height={15} />

        <Button
          label="Return to Home"
          color="#FBC028"
          textColor="#000000"
          onPress={onReturnHome}
        />
      </View>
    </Card>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    width: 414,
    minHeight: 580,
  },
  content: {
    padding: 20,
  },
});

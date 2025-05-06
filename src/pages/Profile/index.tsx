import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import ProfilePhoto from '../../components/molecules/ProfilePhoto';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const username = 'UserTabungJo';
  const email = 'usertabungjo@example.com';
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    requestPermissionsIfNeeded();
  }, []);

  const requestPermissionsIfNeeded = async () => {
    if (Platform.OS === 'android') {
      const readMediaPermissionStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      const readExternalStoragePermissionStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      if (
        readMediaPermissionStatus !== PermissionsAndroid.RESULTS.GRANTED ||
        readExternalStoragePermissionStatus !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        await requestCameraPermission();
      }
    }
  };

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

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grantedReadMedia = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Image Library Access Permission',
            message:
              'App needs access to your image library to update your profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        const grantedReadExternal = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'External Storage Access Permission',
            message:
              'App needs access to external storage to update your profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (
          grantedReadMedia === PermissionsAndroid.RESULTS.GRANTED ||
          grantedReadExternal === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Storage permissions granted');
          return true;
        } else {
          console.log('Storage permissions denied');
          showMessage({
            message: 'Permission denied',
            description: 'Cannot access image library without permission',
            type: 'danger',
          });
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleChangePhoto = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'Image selection cancelled',
          type: 'danger',
        });
      } else if (response.errorCode) {
        console.log(
          'ImagePicker Error: ',
          response.errorCode,
          response.errorMessage,
        );
        showMessage({
          message: 'Error selecting image',
          description: response.errorMessage || 'Unknown error',
          type: 'danger',
        });
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const source = {uri: asset.uri};
        console.log('Selected image URI: ', asset.uri);
        setPhoto(source);
        showMessage({
          message: 'Profile photo updated successfully',
          type: 'success',
        });
      }
    });
  };

  const StaticInput = ({label, value}) => (
    <View style={styles.staticInputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.staticInputWrapper}>
        <Text style={styles.staticInput}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title="Profile" />
        <View style={styles.content}>
          <View style={styles.photoContainer}>
            <View style={styles.profileCircle}>
              <ProfilePhoto
                onPress={handleChangePhoto}
                size={156}
                color="#77A6B6"
                source={photo}
              />
            </View>
          </View>

          <Gap height={20} />

          <StaticInput label="Username" value={username} />
          <StaticInput label="Email" value={email} />

          <Gap height={20} />

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
  profileCircle: {
    width: 168,
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 84,
    borderWidth: 1,
    borderColor: '#8D92A3',
    borderStyle: 'dashed',
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
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import ProfilePhoto from '../../components/molecules/ProfilePhoto';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getAuth} from 'firebase/auth';
import {
  getUserProfile,
  uploadProfilePicture,
  updateUserProfile,
  logOut,
} from '../../services/firebase';

const Profile = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigation.replace('SignIn');
      return;
    }

    setUserId(currentUser.uid);
    setEmail(currentUser.email);

    const unsubscribe = getUserProfile(currentUser.uid, userData => {
      if (userData) {
        setUsername(userData.username || '');
        if (userData.photo) {
          setPhoto({uri: userData.photo});
        }
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const requestPermissions = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const handleChangePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: false,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) return;

      if (result.errorCode) {
        showMessage({
          message: 'Error selecting image',
          description: result.errorMessage,
          type: 'danger',
        });
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setLoading(true);

        try {
          const photoUri = await uploadProfilePicture(
            selectedImage.uri,
            userId,
          );
          setPhoto({uri: photoUri});
          showMessage({
            message: 'Profile photo updated successfully',
            type: 'success',
          });
        } catch (error) {
          console.error('Upload failed:', error);
          showMessage({
            message: 'Failed to update profile photo',
            description: error.message,
            type: 'danger',
          });
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      showMessage({
        message: 'Image picker error',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleChangeUsername = async () => {
    if (!username.trim()) {
      showMessage({message: 'Username cannot be empty', type: 'danger'});
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile(userId, {username});
      showMessage({message: 'Username updated', type: 'success'});
    } catch (error) {
      showMessage({
        message: 'Failed to update username',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigation.replace('SignIn');
    } catch (error) {
      showMessage({
        message: 'Failed to log out',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleReturnHome = () => {
    navigation.navigate('HomeWithGoals');
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
              {loading ? (
                <ActivityIndicator size="large" color="#0F3E48" />
              ) : (
                <ProfilePhoto
                  onPress={handleChangePhoto}
                  size={156}
                  color="#77A6B6"
                  source={photo}
                />
              )}
            </View>
          </View>

          <Gap height={20} />

          <View style={styles.staticInputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#999"
            />
          </View>

          <Button
            label="Change Username"
            onPress={handleChangeUsername}
            color="#77A6B6"
            textColor="#000000"
          />

          <Gap height={20} />
          <StaticInput label="Email" value={email} />
          <Gap height={20} />

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
    backgroundColor: '#EBECE7',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileCircle: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
  },
  staticInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  staticInputWrapper: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  staticInput: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
});

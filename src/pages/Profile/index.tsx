import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Button, Gap } from "../../components/atoms";
import Header from "../../components/molecules/Header";
import ProfilePhoto from "../../components/molecules/ProfilePhoto";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import { getAuth } from "firebase/auth";
import { getUserProfile, uploadProfilePicture, updateUserProfile, logOut, deleteUserData } from "../../services/firebase";

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Request permissions on Android
    if (Platform.OS === "android") {
      requestPermissions();
    }

    // Get current user
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigation.replace("SignIn");
      return;
    }

    setUserId(currentUser.uid);
    setEmail(currentUser.email);

    // Get user profile data
    const unsubscribe = getUserProfile(currentUser.uid, (userData) => {
      if (userData) {
        setUsername(userData.username || "");
        if (userData.photo) {
          setPhoto({ uri: userData.photo });
        }
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const requestPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      ];
      
      await PermissionsAndroid.requestMultiple(permissions);
    } catch (error) {
      console.log("Permission request error:", error);
    }
  };

  const handleChangePhoto = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        showMessage({
          message: "Error selecting image",
          description: response.errorMessage,
          type: "danger",
        });
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        try {
          setLoading(true);
          const photoURL = await uploadProfilePicture(asset.uri, userId);
          setPhoto({ uri: photoURL });
          showMessage({
            message: "Profile photo updated",
            type: "success",
          });
        } catch (error) {
          showMessage({
            message: "Failed to update photo",
            description: error.message,
            type: "danger",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleChangeUsername = async () => {
    if (!username.trim()) {
      showMessage({
        message: "Username cannot be empty",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile(userId, { username });
      showMessage({
        message: "Username updated",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "Failed to update username",
        description: error.message,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = () => {
    navigation.navigate("ConfirmDeleteProfile");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigation.replace("SignIn");
    } catch (error) {
      showMessage({
        message: "Failed to log out",
        description: error.message,
        type: "danger",
      });
    }
  };

  const handleReturnHome = () => {
    navigation.navigate("HomeWithGoals");
  };

  const StaticInput = ({ label, value }) => (
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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileCircle: {
    width: 168,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 84,
    borderWidth: 1,
    borderColor: "#8D92A3",
    borderStyle: "dashed",
  },
  staticInputContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    marginBottom: 6,
    color: "#000000",
  },
  staticInputWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0F3E48",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
  },
  staticInput: {
    fontFamily: "Inter-Regular",
    color: "#000000",
  },
});
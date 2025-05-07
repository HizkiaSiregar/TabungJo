import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Image } from "react-native";
import { Button, Gap } from "../../components/atoms/";
import { Header, FormInput } from "../../components/molecules/";
import { signUp } from "../../services/firebase";
import { showMessage } from "react-native-flash-message";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      showMessage({
        message: "All fields are required",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, {
        username,
        fullName: username,
        photo: ""
      });
      
      showMessage({
        message: "Registration successful",
        description: "Your account has been created. Please sign in.",
        type: "success",
      });
      
      navigation.navigate("SignIn");
    } catch (error) {
      let message = "Registration failed";
      
      // Handle specific error codes
      if (error.code === "auth/email-already-in-use") {
        message = "Email is already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak";
      }
      
      showMessage({
        message,
        description: error.message,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Gap height={20} />
          <Image
            source={require("../../assets/LogoTabungJo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Gap height={20} />
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
          <FormInput
            label="Password"
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Gap height={30} />
          <Button
            label={loading ? "Creating account..." : "Create"}
            onPress={handleSignUp}
            color="#FBC028"
            textColor="#000000"
            disabled={loading}
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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 300,
  },
});
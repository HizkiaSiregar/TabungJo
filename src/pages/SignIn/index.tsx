import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Button, Gap } from "../../components/atoms";
import { Header, FormInput } from "../../components/molecules";
import { signIn } from "../../services/firebase";
import { showMessage } from "react-native-flash-message";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      showMessage({
        message: "Email and password are required",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signIn(email, password);
      navigation.replace("HomeWithGoals");
    } catch (error) {
      let message = "Sign in failed";
      
      // Handle specific error codes
      if (error.code === "auth/user-not-found") {
        message = "User not found";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format";
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/LogoTabungJo.png")}
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
            label={loading ? "Signing in..." : "Login"}
            onPress={handleSignIn}
            color="#FBC028"
            textColor="#000000"
            disabled={loading}
          />
          <Gap height={15} />
          <Button
            label="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
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
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 450,
    height: 450,
    alignSelf: "center",
    marginTop: -85,
    marginBottom: -125,
  },
  formContainer: {
    width: "100%",
  },
});
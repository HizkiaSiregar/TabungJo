// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import SplashScreen from './src/pages/SplashScreen';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeEmpty from './src/pages/HomeEmpty';
import HomeWithGoals from './src/pages/HomeWithGoals';
import Profile from './src/pages/Profile';
import AddGoals from './src/pages/AddGoals';
import EditGoals from './src/pages/EditGoals';
import AddSavings from './src/pages/AddSaving';
import ConfirmDeleteProfile from './src/pages/ConfirmDeleteProfile';
import ConfirmDeleteGoal from './src/pages/ConfirmDeleteGoal';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeEmpty"
          component={HomeEmpty}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeWithGoals"
          component={HomeWithGoals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddGoals"
          component={AddGoals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditGoals"
          component={EditGoals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSavings"
          component={AddSavings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmDeleteProfile"
          component={ConfirmDeleteProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmDeleteGoal"
          component={ConfirmDeleteGoal}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
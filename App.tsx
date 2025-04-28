// App.js
import React from 'react';
import SplashScreen from './src/pages/SplashScreen';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import Profile from './src/pages/Profile';
import ConfirmDeleteProfile from './src/pages/ConfirmDeleteProfile';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmDeleteProfile"
          component={ConfirmDeleteProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
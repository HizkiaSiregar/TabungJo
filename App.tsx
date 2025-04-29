import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeEmpty from './src/pages/HomeEmpty';
import Profile from './src/pages/Profile';
import AddGoals from './src/pages/AddGoals';
import ConfirmDeleteProfile from './src/pages/ConfirmDeleteProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log('Rendering App');
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
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
          name="HomeEmpty"
          component={HomeEmpty}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddGoals"
          component={AddGoals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmDeleteProfile"
          component={ConfirmDeleteProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
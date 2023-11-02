/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,Text,useColorScheme,} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './src/screens/SignInScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.root}> {
      <><NavigationContainer>
        <Stack.Navigator initialRouteName="SignInScreen">
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer><SignInScreen /></>
      /*<UserProfileScreen/>
      <SignUpScreen/>
      For a temporary measure, you can uncomment a certain screen to see it.
      */
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;

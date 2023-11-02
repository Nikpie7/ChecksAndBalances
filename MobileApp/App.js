import React from 'react';
import {SafeAreaView,StyleSheet,Text,useColorScheme,} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
      {/* 
      <SignInScreen/>
      <UserProfileScreen/> 
      For a temporary measure, you can uncomment a certain screen to see it.
      */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;

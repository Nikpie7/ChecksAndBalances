/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,Text,useColorScheme,} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/client/navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;

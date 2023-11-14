import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name = "Loading" component={LoadingScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Dashboard" component={DashboardScreen}/>        
                <Stack.Screen name="Profile" component={UserProfileScreen}/>    
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
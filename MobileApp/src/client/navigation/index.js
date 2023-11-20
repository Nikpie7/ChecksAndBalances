import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoadingScreen from '../screens/LoadingScreen';
<<<<<<< HEAD
import DashboardScreen from '../screens/DashboardScreen';
=======
import ForgotPassScreen from '../screens/ForgotPassScreen';
>>>>>>> 37535d096c3e3892659eb82a92465459fcd0bc3b

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name = "Loading" component={DashboardScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
<<<<<<< HEAD
                <Stack.Screen name="Home" component={DashboardScreen}/>            
=======
                <Stack.Screen name="Dashboard" component={DashboardScreen}/>        
                <Stack.Screen name="Profile" component={UserProfileScreen}/>
                <Stack.Screen name="Forgot" component={ForgotPassScreen}/>    
>>>>>>> 37535d096c3e3892659eb82a92465459fcd0bc3b
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
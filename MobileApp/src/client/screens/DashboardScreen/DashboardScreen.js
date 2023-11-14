import React, { useState } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';


const DashboardScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onLogOutPressed = () => {
        Keychain.resetGenericPassword();
        console.warn("Logging out...");
        navigation.navigate('SignIn');
    }
    
    return(
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>
        
            <Text style={styles.text}>Welcome to the Dashboard</Text>
            <TouchableOpacity onPress={onLogOutPressed} style={styles.button}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    button: {
        backgroundColor: '#04ACD9DD',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 32,
    },
});

export default DashboardScreen;
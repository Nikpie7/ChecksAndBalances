import React, { useEffect } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import Wait from '../../../../assets/images/load.gif';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

const LoadingScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    useEffect(() => {
        //check if user has saved credentials
        (async () => {
            try{
                const credentials = await Keychain.getGenericPassword();
                //if credentials exist, try to log in
                if(credentials){
                    bodyVariable = JSON.stringify({"username": credentials.username,"password": credentials.password,})
                    //Validate the user
                    fetch('https://checksnbalances.us/api/login', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: bodyVariable,
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.id !== 0 && data.id !== -1){
                            //then go to home page
                            console.warn("Successfully Logged In!");
                            navigation.navigate('Dashboard');
                        }
                        else{
                            navigation.navigate('SignIn');
                            console.warn("Password has been changed recently...");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
                else{
                    console.log("No credentials stored.");
                    navigation.navigate('SignIn');
                }
            }
            catch(error){
                console.log("Keychain could not be accessed!", error);
                navigation.navigate('SignIn');
            }
        }) ();
    }, []);

    return(
        <View style={styles.root}>
            <Image source={Background} style={[styles.background]} resizeMode="cover"/>
            <Image source={Logo} style={[styles.logo, {height: height * 0.9}]} resizeMode="contain"/>
            <Image source={Wait} style={[styles.logo, {height: height * 0.3}]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    background:{
        position: 'absolute',
        maxWidth: 500,
        maxHeight: 900,
    },
    root:{
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '90%',
        maxWidth: 300,
        maxHeight: 300,
    },
});

export default LoadingScreen;
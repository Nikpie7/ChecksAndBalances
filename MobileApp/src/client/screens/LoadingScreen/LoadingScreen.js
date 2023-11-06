import React, { useState } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import Wait from '../../../../assets/images/load.gif';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onContinue = () => {
        
        
        navigation.navigate('SignIn');
        
        
        //Eventually, I will make it so it looks at local stored account information to see if an account exists
        //If an account exists it will skip the log in page and log the user in

        // bodyVariable = JSON.stringify({"username": username,"password": password,})
        
        // console.log(bodyVariable);
        // //Validate the user
        // fetch('https://checksnbalances.us/api/login', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: bodyVariable,
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     if(data.id !== 0 && data.id !== -1){
        //         //then go to home page
        //         console.warn("Successfully Logged In!");
        //         navigation.navigate('Home');
        //     }
        //     else{
        //         console.warn("Incorrect User or Pass");
        //     }
        // })
        // .catch(error => {
        // console.error(error);
        // });
       
    }

    return(
        <View style={styles.root}>
            <Image source={Background} style={[styles.background]} resizeMode="cover"/>
            <Image source={Logo} style={[styles.logo, {height: height * 0.9}]} resizeMode="contain"/>
            <Image source={Wait} style={[styles.logo, {height: height * 0.3}]}/>

            <CustomButton text="Continue" onPress={onContinue} type="primary"/>
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
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignUpPressed = () => {
        //validation
        if(username !== "" && email !== "" && password !== "" 
        && passwordRepeat !== "" && firstName !== "" && lastName != ""
        && streetAddress !== "" && zipCode !== ""){
            if(password === passwordRepeat){
                //gather up all fields
                bodyVariable = JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "address": streetAddress,
                    "zipCode": zipCode,
                })
                console.log(bodyVariable);

                //send data to server
                fetch('https://checksnbalances.us/api/register', {
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
                    if(data.error == ""){
                        //redirect to log in screen
                        console.warn("Registration Complete! Log in...");
                        navigation.navigate('SignIn');
                    }
                    else{
                        console.warn("You done messed up");
                    }
                })
                .catch(error => {
                console.error(error);
                });
            }
            else{console.warn("Password and Confirm Password do not match!");}
        }
        else{console.warn("Please fill out all fields!");}
    };

    return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>

                <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secure={true}/>
                <CustomInput placeholder="Confirm Password" value={passwordRepeat} setValue={setPasswordRepeat} secure={true}/>
                <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
                <CustomInput placeholder="Your First Name" value={firstName} setValue={setFirstName}/>
                <CustomInput placeholder="Your Last Name" value={lastName} setValue={setLastName}/>
                <CustomInput placeholder="123 Main Street, Orlando, FL" value={streetAddress} setValue={setStreetAddress}/>
                <CustomInput placeholder="12345" value={zipCode} setValue={setZipCode}/>
                <CustomButton text="Register" onPress={onSignUpPressed} type="primary"/>
            </View>
        </KeyboardAwareScrollView>
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
        maxHeight: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});

export default SignUpScreen;
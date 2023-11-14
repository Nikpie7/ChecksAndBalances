/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, useWindowDimensions} from 'react-native';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
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
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={Background} resizeMode="cover" />
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.whiteBox}>
                        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername}/>
                        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
                        <TextInput style={styles.input} placeholder="Confirm Password" value={passwordRepeat} onChangeText={setPasswordRepeat} secure={true}/>
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
                        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName}/>
                        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName}/>
                        <TextInput style={styles.input} placeholder="123 Main Street, Orlando, FL" value={streetAddress} onChangeText={setStreetAddress}/>
                        <TextInput style={styles.input} placeholder="12345" value={zipCode} onChangeText={setZipCode}/>
                        
                        <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: '70%',
        alignSelf: 'center',
    },
    inputContainer: {
        flex: 1,
        padding: 20,
        bottom: '15%',
        marginTop: '15%',
    },
    whiteBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        padding: 20,
    },
    input: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
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
});

export default SignUpScreen;
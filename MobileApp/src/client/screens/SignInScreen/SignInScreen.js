import React, { useState } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onLogInPressed = () => {
        bodyVariable = JSON.stringify({"username": username,"password": password,})
        
        console.log(bodyVariable);
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
                navigation.navigate('Home');
            }
            else{
                console.warn("Incorrect User or Pass");
            }
        })
        .catch(error => {
        console.error(error);
        });
       
    }

    const onSignUpPressed = () => {
        //go to sign up screen
        navigation.navigate('SignUp');
    }

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
                        
                        <TouchableOpacity onPress={onLogInPressed} style={styles.button}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={onSignUpPressed} style={styles.noAccountContainer}>
                            <Text style={styles.signUpText}>No Account? Sign Up</Text>
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
        top: '10%',
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
    noAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signUpText: {
        color: 'black',
    },
});

export default SignInScreen;
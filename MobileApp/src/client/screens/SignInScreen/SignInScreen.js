import React, { useState, useContext } from 'react'
import * as Keychain from 'react-native-keychain';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/UserContext/UserContext';

const SignInScreen = () => {
    const {updateUser} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [verifError, setVerifError] = useState(false);

    const navigation = useNavigation();

    const onLogInPressed = () => {
        setError(null);
        setVerifError(false);
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
            if(data.id){
                const userData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userID: data.id,
                    email: data.email,
                    address: data.address,
                    zip: data.zipCode,
                    verified: data.verified,
                };

                //then go to home page
                console.warn("Successfully Logged In!");
                
                Keychain.setGenericPassword(username, password).then(() => {
                    console.log("Credentials saved successfully!")
                    updateUser(userData);
                    navigation.navigate('Dashboard');
                })
                .catch(error => {
                    console.log("Failed to save credentials", error);
                    setError(error);
                });
            }
            else{
                if(data.error === 'Account not verified. Please check your email for the verification link.'){
                    setVerifError(true);
                    setError(data.error);
                }else{
                    console.log("Login Failed");
                    setError(data.error);
                    setVerifError(false);
                }
                
            }
        })
        .catch(error => {
            console.error('Login Failed: ', error);
            setError('Login Failed: ', error);
        });
       
    }

    const onSignUpPressed = () => {
        //go to sign up screen
        navigation.navigate('SignUp');
    }

    const onForgotPressed = () => {
        //go to forgot password screen
        navigation.navigate('Forgot');
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
                        {error && (
                            <View style={verifError ? styles.warnBanner : styles.errorBanner}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                        <FloatingLabelInput style={[styles.input, (error && !verifError) && styles.inputError]} label="Username" value={username} onChangeText={setUsername}/>
                        <FloatingLabelInput style={[styles.input, (error && !verifError) && styles.inputError]} label="Password" value={password} onChangeText={setPassword} secureTextEntry/>
                        
                        <TouchableOpacity onPress={onForgotPressed} style={styles.forgotPassContainer}>
                            <Text style={styles.normalText}>Forgot Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onLogInPressed} style={styles.button}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onSignUpPressed} style={styles.noAccountContainer}>
                            <Text style={styles.normalText}>No Account? Sign Up</Text>
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
    inputError:{
        borderColor: 'red',
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
    forgotPassContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    normalText: {
        color: 'black',
    },
    errorBanner: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    warnBanner: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default SignInScreen;
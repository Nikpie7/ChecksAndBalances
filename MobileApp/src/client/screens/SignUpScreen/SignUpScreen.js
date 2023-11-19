/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
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
    const [emptyInputs, setEmptyInputs] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    

    const onSignUpPressed = () => {
        //Validation to see if all fields are filled
        const inputs = [username, password, passwordRepeat, email, firstName, lastName, streetAddress, zipCode];
        const emptyInputIndex = inputs.reduce((acc, input, index) => {
            if(input === ''){
                acc.push(index);
            }
            return acc;
        }, []);

        if(emptyInputIndex.length > 0){
            const inputNames = ['Username', 'Password', 'Confirm Password', 'Email', 'First Name', 'Last Name', 'Street Address', 'Zip Code'];
            setEmptyInputs(emptyInputIndex);
            const emptyFields = emptyInputIndex.map(index => inputNames[index]);
            setError(`Please Fill out: ${emptyFields.join(', ')}`);
            console.log('All fields are not filled out');
            return;
        }
        //Validation for password matching
        if(password !== passwordRepeat){
            setEmptyInputs([1, 2]);
            setError("Error: Passwords do not match");
            return;
        }
        //Validation for password complexity
        if(password.length < 8 && passwordRepeat.length < 8){
            setEmptyInputs([1, 2]);
            setError("Error: Password must be greater than 8 characters");
            return;
        }

        //Passed Validation
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
                        {error && (
                            <View style={styles.errorBanner}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                        <TextInput style={[styles.input, emptyInputs.includes(0) && styles.inputError,]} placeholder="Username" value={username} onChangeText={setUsername}/>
                        <TextInput style={[styles.input, emptyInputs.includes(1) && styles.inputError,]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
                        <TextInput style={[styles.input, emptyInputs.includes(2) && styles.inputError,]} placeholder="Confirm Password" value={passwordRepeat} onChangeText={setPasswordRepeat} secureTextEntry/>
                        <TextInput style={[styles.input, emptyInputs.includes(3) && styles.inputError,]} placeholder="Email" value={email} onChangeText={setEmail}/>
                        <TextInput style={[styles.input, emptyInputs.includes(4) && styles.inputError,]} placeholder="First Name" value={firstName} onChangeText={setFirstName}/>
                        <TextInput style={[styles.input, emptyInputs.includes(5) && styles.inputError,]} placeholder="Last Name" value={lastName} onChangeText={setLastName}/>
                        <TextInput style={[styles.input, emptyInputs.includes(6) && styles.inputError,]} placeholder="123 Main Street, Orlando, FL" value={streetAddress} onChangeText={setStreetAddress}/>
                        <TextInput style={[styles.input, emptyInputs.includes(7) && styles.inputError,]} placeholder="12345" value={zipCode} onChangeText={setZipCode}/>
                        
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
    inputError: {
        borderColor: 'red',
    },
    errorBanner: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default SignUpScreen;
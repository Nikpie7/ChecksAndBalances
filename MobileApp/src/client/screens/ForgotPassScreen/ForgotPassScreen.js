/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingLabelInput from '../../components/FloatingLabelInput';


const ForgotPassScreen = () => {
    const [email, setEmail] = useState('');
    const [emptyInputs, setEmptyInputs] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    

    const onResetPressed = () => {
        //reset error
        setError(null);
        setEmptyInputs([]);
        //Validation to see if all fields are filled
        const inputs = [email];
        const emptyInputIndex = inputs.reduce((acc, input, index) => {
            if(input === ''){
                acc.push(index);
            }
            return acc;
        }, []);

        if(emptyInputIndex.length > 0){
            const inputNames = ['Email'];
            setEmptyInputs(emptyInputIndex);
            const emptyFields = emptyInputIndex.map(index => inputNames[index]);
            setError(`Please Fill out: ${emptyFields.join(', ')}`);
            console.log('All fields are not filled out');
            return;
        }

        bodyVariable = JSON.stringify({
            "email":email
        })

        //send data to server
        fetch('https://checksnbalances.us/api/send-password-reset', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: bodyVariable,
            
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                setError("An error occurred while sending the reset link.");
            } else {
                console.log("Password reset link sent successfully!");
                // Optionally, navigate the user to a confirmation screen
                // navigation.navigate('ResetLinkSentConfirmation');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError("An error occurred while sending the reset link."); // Show an error message
        });
    };

    return(
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={Background} resizeMode="cover" />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
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
                        <Text style={styles.normalText}>Input the email address you used to sign up for a password reset link sent to your email.</Text>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(0) && styles.inputError,]} label="Email" value={email} onChangeText={setEmail}/>
                        
                        <TouchableOpacity onPress={onResetPressed} style={styles.button}>
                            <Text style={styles.buttonText}>Send Reset Link</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999,
    },
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
    normalText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default ForgotPassScreen;
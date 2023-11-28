/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingLabelInput from '../../components/FloatingLabelInput/FloatingLabelInput';
import PasswordComplex from '../../components/PasswordComplex/PasswordComplex';
import Modal from 'react-native-modal';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [emptyInputs, setEmptyInputs] = useState([]);
    const [errors, setErrors] = useState([]);
    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const navigation = useNavigation();

    

    const onSignUpPressed = () => {
        setValidEmail(true);
        setValidPass(true);
        //Validation to see if all fields are filled
        const inputs = [password, passwordRepeat, email, firstName, lastName, streetAddress, zipCode];
        const emptyInputIndex = inputs.reduce((acc, input, index) => {
            if(input === ''){
                acc.push(index);
            }
            return acc;
        }, []);

        const validationErrors = [];

        if(emptyInputIndex.length > 0){
            const inputNames = ['Password', 'Confirm Password', 'Email', 'First Name', 'Last Name', 'Street Address', 'Zip Code'];
            const emptyFields = emptyInputIndex.map(index => inputNames[index]);
            validationErrors.push(`Please Fill out: ${emptyFields.join(', ')}`);
        }

        // Regular expression to check for '@' in the email
        const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        //Validation for password matching
        if(password !== passwordRepeat){
            setValidPass(false);
            validationErrors.push("Passwords do not match");
        }
        //Validation for password length
        if(password.length < 8){
            setValidPass(false);
            validationErrors.push("Password must be greater than 8 characters");
        }
        //Validation for password number
        if(!(/\d/.test(password))){
            setValidPass(false);
            validationErrors.push("Password must contain numbers");
        }
        //Validation for password Upper
        if(!(/[A-Z]/.test(password))){
            setValidPass(false);
            validationErrors.push("Password must contain at least one uppercase letter");
        }
        //Validation for password Special
        if(!(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))){
            setValidPass(false);
            validationErrors.push("Password must contain at least one special character");
        }

        if (!isValidEmailFormat) {
            setValidEmail(false);
            validationErrors.push("Please enter a valid email address");
        }

        setErrors(validationErrors);
        setEmptyInputs(emptyInputIndex);

        if(validationErrors.length > 0){
            return;
        }
        //Passed Validation
        //gather up all fields
        bodyVariable = JSON.stringify({
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
                setIsSuccessModalVisible(true);
                console.warn("Registration Complete! Check Email for Varification!");
            }
            else{
                console.log("Error Processing email verifciation");
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.whiteBox}>
                    {errors.length > 0 && (
                        <View style={styles.errorBanner}>
                            <Text style={styles.errorText}>Error:</Text>
                            {errors.map((errorMessage, index) => (
                                <Text key={index} style={styles.errorText}>
                                    {errorMessage}
                                </Text>
                            ))}
                        </View>
                        )}
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(0) && styles.inputError, !validPass && styles.inputError,]} label="Password" value={password} onChangeText={setPassword} secureTextEntry/>
                        <PasswordComplex password={password}/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(1) && styles.inputError, !validPass && styles.inputError,]} label="Confirm Password" value={passwordRepeat} onChangeText={setPasswordRepeat} secureTextEntry/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(2) && styles.inputError, !validEmail && styles.inputError,]} label="Email" value={email} onChangeText={setEmail}/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(3) && styles.inputError,]} label="First Name" value={firstName} onChangeText={setFirstName}/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(4) && styles.inputError,]} label="Last Name" value={lastName} onChangeText={setLastName}/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(5) && styles.inputError,]} label="Street Address, City, State" value={streetAddress} onChangeText={setStreetAddress}/>
                        <FloatingLabelInput style={[styles.input, emptyInputs.includes(6) && styles.inputError,]} label="5 Digit Zip Code" value={zipCode} onChangeText={setZipCode}/>
                        
                        <TouchableOpacity onPress={onSignUpPressed} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal isVisible={isSuccessModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={[styles.whiteBox, styles.modalContent]}>
                        <Text style={styles.modalText}>
                            Registration Complete,{"\n"} Check Email for Verification!
                        </Text>
                        <TouchableOpacity
                            style={[styles.button, styles.modalButton]}
                            onPress={() => {
                                setIsSuccessModalVisible(false);
                                navigation.navigate('SignIn');
                            }}
                        >
                            <Text style={[styles.buttonText, styles.modalButtonText]}>
                                Return to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        fontSize: 19,
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
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#04ACD9DD',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtonText: {
        fontSize: 22,
    },
});

export default SignUpScreen;
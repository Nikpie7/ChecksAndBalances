/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
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

<<<<<<< HEAD
    return (
=======
    const navigation = useNavigation();

    const onSignUpPressed = () => {
        //send data to server
      
        //redirect to log in screen
        console.warn("Successfully Added Account!");
        navigation.navigate('SignIn');
      };

    return(
>>>>>>> c2cdced7b21542b914145c0767c211c096d6e9c6
        <View style={styles.root}>
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
});

export default SignUpScreen;
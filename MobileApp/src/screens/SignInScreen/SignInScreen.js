/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001'
  : 'http://checksnbalances.us';

const onLogInPressed = () => {
    console.warn("Log in");
}

const onSignUpPressed = () => {
    console.warn("Sign Up");
}

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const handleSubmit = async () => {
        if (username === '' || password === '') {
            alert('All fields are required');
            return;
        }
        await axios.post('${baseUrl}/api/login', {username, password});
        alert('Sign up successful');
    };
    return(
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>
        
            <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secure={true}/>
            <CustomButton text="Log In" onPress={onLogInPressed} type="primary"/>
            <CustomButton text="No Account? Sign Up" onPress={onSignUpPressed} type="small"/>
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

export default SignInScreen;

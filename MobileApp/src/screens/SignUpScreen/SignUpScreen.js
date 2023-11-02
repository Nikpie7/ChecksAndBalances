import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from 'react-native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn('Sign in');
    }

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    }

    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    }
}
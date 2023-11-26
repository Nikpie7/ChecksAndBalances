import React, { useState, useContext } from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/UserContext/UserContext';

const InterestsScreen = () => {
    const { user } = useContext(UserContext);

    const navigation = useNavigation();

    const getInterests = () => {

    }

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
                    <Text>Interests</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.whiteBox}>
                    {/* place all interests and interest icons */}
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
    background:{
        position: 'absolute',
        maxWidth: 500,
        maxHeight: 900,
    },
    root:{
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
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
});

export default InterestsScreen;
import React from 'react'
import {Text, Pressable, StyleSheet } from 'react-native'

const CustomButton = ({onPress, text, type = "primary"}) => {
    return(
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_primary: {
        backgroundColor: '#04ACD9DD',
    },

    container_small: {
    },

    text_small: {
        color: "black",
    },

    text: {
        fontWeight: 'bold',
        color: 'black'
    },
});

export default CustomButton;
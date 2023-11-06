import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secure}) => {
    return(
        <View style={styles.container}>
            <TextInput value={value} onChangeText={setValue} placeholder={placeholder} secureTextEntry={secure} style={styles.input}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#04ACD975',
        width: '100%',

        borderColor:"black",
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
})

export default CustomInput;
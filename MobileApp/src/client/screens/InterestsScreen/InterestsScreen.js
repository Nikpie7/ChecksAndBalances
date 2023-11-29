import React, { useEffect, useState, useContext } from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Background from '../../../../assets/images/background.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/UserContext/UserContext';

const InterestsScreen = () => {
    const { user } = useContext(UserContext);
    const [userInterests, setUserInterests] = useState([]);
    const navigation = useNavigation();

    const interestsData = [
        { id: 1, title: 'Agriculture', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 2, title: 'Spending', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 3, title: 'Military & National Defense', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 4, title: 'Veterans', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 5, title: 'Taxation', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 6, title: 'Finance', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 7, title: 'Education', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 8, title: 'Labor', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 9, title: 'Energy', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 10, title: 'Science & Tech', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 11, title: 'Governmental Reform', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 12, title: 'Foreign Affairs', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 13, title: 'Infrastructure', image: require('../../../../assets/images/ProfileImage.png') },
        { id: 14, title: 'Health', image: require('../../../../assets/images/ProfileImage.png') },
    ];

    // Function to add or remove interests
    const toggleInterest = (interest) => {
        const index = userInterests.findIndex((item) => item.InterestName === interest.title);

        if (index === -1) {
        setUserInterests([...userInterests, { InterestName: interest.title, value: true }]);
        } else {
        const updatedInterests = [...userInterests];
        updatedInterests.splice(index, 1);
        setUserInterests(updatedInterests);
        }
    };

    const getInterests = () => {
        fetch(`https://checksnbalances.us/api/readInterests?token=${user.token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUserInterests(data.Interests);
        })
        .catch(error => {
            console.error(error);
        });
    };

    // Function to update user interests on the server
    const updateUserInterests = () => {
        const updatedInterests = interestsData.map((interest) => {
        const isSelected = userInterests.some(
            (userInterest) => userInterest.InterestName === interest.title && userInterest.value === true
        );
        return {
            InterestName: interest.title,
            value: isSelected,
        };
        });
    
        fetch('https://checksnbalances.us/api/updateInterests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: user.token,
            interests: updatedInterests,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Interests updated:', data.interests);
        })
        .catch((error) => {
            console.error('Error updating interests:', error);
        });
    };

    useEffect(() => {
        getInterests();
    }, []);

    useEffect(() => {
        updateUserInterests();
    }, [userInterests]);

    const renderInterests = () => {
        return interestsData.map((interest, index) => {
          const isInterestSelected = userInterests.find(
            userInterest => userInterest.InterestName === interest.title && userInterest.value === true
          );
    
          return (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestButton,
                index % 2 !== 0 ? styles.marginLeft : null,
                isInterestSelected ? styles.selectedInterest : null,
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Image source={interest.image} style={styles.interestImage} />
              <Text style={[styles.interestTitle, isInterestSelected ? styles.selectedTitle : null]}>
                {interest.title}
              </Text>
            </TouchableOpacity>
          );
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Interests</Text>
                </View>
                <View style={styles.whiteBox}>{renderInterests()}</View>
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
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    whiteBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    interestButton: {
        width: '48%', // Two interests per row with a small gap
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    interestImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    interestTitle: {
        textAlign: 'center',
    },
    marginLeft: {
        marginLeft: '4%',
    },
    selectedInterest: {
        backgroundColor: 'lightblue',
        borderColor: 'darkblue',
      },
      selectedTitle: {
        fontWeight: 'bold',
      },
      selectedText: {
        color: 'blue',
      },
});

export default InterestsScreen;
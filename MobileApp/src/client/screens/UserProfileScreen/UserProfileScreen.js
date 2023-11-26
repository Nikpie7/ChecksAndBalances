import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../../../../assets/images/background.png';
import pic from '../../../../assets/images/ProfileImage.png';
import { UserContext } from '../../components/UserContext/UserContext';

const UserProfileScreen = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.root}>
      <Image source={Background} style={[styles.background]} resizeMode="cover" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* White Box */}
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.profileImage} resizeMode="cover" />
        </View>

        {/* First and Last Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          {/* Render user details here */}
          <Text style={styles.detail}>UserID: {user.id}</Text>
          <Text style={styles.detail}>Email: {user.email}</Text>
          <Text style={styles.detail}>Email Verified?: {user.varified}</Text>
          <Text style={styles.detail}>Address: {user.address}</Text>
          <Text style={styles.detail}>Zip: {user.zipCode}</Text>
          {/* Add other user details */}
        </View>
      </View>
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
  background: {
    position: 'absolute',
    maxWidth: 500,
    maxHeight: 900,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 100,
    width: '100%', // Adjust the width of the white box
  },
  imageContainer: {
    backgroundColor: 'black',
    width: 160, // Decreased image size
    height: 160, // Decreased image size
    borderRadius: 80, // Half of width and height for a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default UserProfileScreen;

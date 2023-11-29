/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, DrawerLayoutAndroid, StyleSheet, Modal as RNModal } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../../../assets/images/background.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BillTable from '../../components/BillTable/BillTable';
import RepTable from '../../components/BillTable/RepTable';
import { UserContext } from '../../components/UserContext/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import BillModal from '../../components/BillModal/BillModal';
import RepBillTable from '../../components/BillTable/RepBillTable';
import pic from '../../../../assets/images/ProfileImage.png';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';

const initialBillModalData = {
  id: "",
  title: "",
  billType: "",
  billNumber: "",
  congressNum: -1,
  lastUpdated: "",
  committee: "",
  relatedInterest: "",
  sponsor: "",
  cosponsors: [],
  summary: "",
  accessVotes: {
    democrat: -1,
    republican: -1,
    independent: -1,
  },
  subject: "",
  billAmendments: [],
  billActions: "",
};

function InterestsScreen() {
  const navigation = useNavigation();
  const queryClient = new QueryClient();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refresh the BillTable when the InterestsScreen is focused again
      setRefreshKey((prevKey) => prevKey + 1);
    });

    return unsubscribe;
  }, [navigation]);

  // const [billModalOpen, setBillModalOpen] = useState(false);
  // const [clickedBillData, setClickedBillData] = useState(initialBillModalData);

  // const handleOpenBillModal = () => {
  //   setBillModalOpen(true);
  // };

  // const handleCloseBillModal = () => {
  //   setBillModalOpen(false);
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */}
        <QueryClientProvider client={queryClient}>
          <Image source={Background} style={[styles.background]} resizeMode="cover"/>
          {/* <RepBillTable clickedBillData={clickedBillData}
              setClickedBillData={setClickedBillData}
              handleOpenBillModal={handleOpenBillModal}/> */}
          <BillTable key={refreshKey}/>
        </QueryClientProvider>
        {/* <BillModal
          isOpen={billModalOpen}
          onClose={handleCloseBillModal}
          billData={clickedBillData}
        /> */}
      {/* <Text fontSize={20}>All Interests!</Text> */}
    </View>
  );
}

function RepresentativesScreen() {
  const queryClient = new QueryClient();

  // const [billModalOpen, setBillModalOpen] = useState(false);
  // const [clickedBillData, setClickedBillData] = useState(initialBillModalData);

  // const handleOpenBillModal = () => {
  //   setBillModalOpen(true);
  // };

  // const handleCloseBillModal = () => {
  //   setBillModalOpen(false);
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */ }
        <QueryClientProvider client={queryClient}>
          <Image source={Background} style={[styles.background]} resizeMode="cover"/>
          {/* <RepBillTable clickedBillData={clickedBillData}
              setClickedBillData={setClickedBillData}
              handleOpenBillModal={handleOpenBillModal}/> */}
          <RepBillTable />
        </QueryClientProvider>
        {/* <BillModal
          isOpen={billModalOpen}
          onClose={handleCloseBillModal}
          billData={clickedBillData}
        /> */}
    </View>
  );
}

function MyRepresentativesScreen() {
  const queryClient = new QueryClient();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */}
        <QueryClientProvider client={queryClient}>
          <Image source={Background} style={[styles.background]} resizeMode="cover"/>
          <RepTable />
        </QueryClientProvider>
      {/* <Text fontSize={20}>All Interests!</Text> */}
    </View>
  );
}

const NavigationView = ({ onCloseDrawer, onLogOutPressed, onInterestsPressed }) => (
  <View style={styles.navigationContainer}>
    <TouchableOpacity style={styles.closeButton} onPress={onCloseDrawer}>
      {/* Icon for close button */}
      <Icon name="close" size={30} color="black" />
    </TouchableOpacity>
    <View style={styles.drawerButtons}>
      <TouchableOpacity style={styles.drawerButton} onPress={onInterestsPressed}>
        <Text>Change Interests</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.drawerButtons}>
      <TouchableOpacity style={styles.drawerButton} onPress={onLogOutPressed}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>

  </View>
);

const DashboardScreen = () => {
  const { user } = useContext(UserContext);
  const drawer = useRef(null);

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");
  const [displayBillModal, setDisplayBillModal] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const Tab = createBottomTabNavigator();

  // const toggleTypeOfBill = () => {
  //   setTypeOfBill(!typeOfBill);
  // }

  const handleSearch = () => {
    // TODO
    console.log('beans! Can\'t search quite yet but will be able to soon!');
  };

  const onProfilePressed = () => {
    navigation.navigate('Profile');
    console.warn("Going to profile");
  };
  const onInterestsPressed = () => {
    closeDrawer();
    setTimeout(() => {
    navigation.navigate('Interests');
    }, 300);
    console.warn("Going to interests page");
  }

  const onLogOutPressed = () => {
    closeDrawer();
    setTimeout(() => {
    setLogoutModalVisible(true);
    }, 300);
  }
  const onLogOutCancelPressed = () => {
    setLogoutModalVisible(false);
  }
  const onLogOutConfirmPressed = () => {
    Keychain.resetGenericPassword();
    navigation.navigate('SignIn');
  }

  const closeDrawer = () => {
    if (drawer.current) {
      drawer.current.closeDrawer();
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={() => <NavigationView onCloseDrawer={closeDrawer} onLogOutPressed={onLogOutPressed} onInterestsPressed={onInterestsPressed}/>}>
      <SafeAreaView style={{ flex: 1 }}>
        <Image source={Background} style={[styles.background]} resizeMode="cover"/>

        {/* Header section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          <TouchableOpacity onPress={onProfilePressed}>
            {/* <Image source={pic} resizeMode='contain'/> */}
            <View style={styles.userInfoContainer}>
              <View style={styles.imageContainer}>
                <Image source={pic} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
              </View>
              <Text style={styles.user}>{user.firstName} {user.lastName}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <Icon name="menu" size={40} color="black" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View>
          <TextInput placeholder="Search..." style={ styles.searchBar } /*Add onclick *//>
        </View>

      {/* Feed Section */}
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Bills by Interest') {
              iconName = focused ? 'heart' : 'heart';
            } else if (route.name === 'All Bills') {
              iconName = focused ? 'document' : 'copy';
            } else if (route.name === 'Representatives') {
              iconName = focused ? 'body' : 'man';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
            "tabBarActiveTintColor": "red",
            "tabBarInactiveTintColor": "gray",
            "tabBarLabelStyle": {
              "fontSize": 12
            },
        })}>
          <Tab.Screen name="Bills by Interest" component={InterestsScreen} icon={<Icon name="home" size={24} />}/>
          <Tab.Screen name="All Bills" component={RepresentativesScreen} icon={<Icon name="home" size={24} />}/>
          <Tab.Screen name="Representatives" component={MyRepresentativesScreen} icon={<Icon name="home" size={24} />} />
        </Tab.Navigator>
      </SafeAreaView>

      <RNModal visible={isLogoutModalVisible} animationType="fade" transparent={true} onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to log out? {"\n"} Stored credentials will be reset!</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={onLogOutConfirmPressed}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={onLogOutCancelPressed}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>

    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  root:{
      alignItems: 'left',
      padding: 10,
  },
  logo: {
      width: '75%',
      maxWidth: 300,
      maxHeight: 50,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Half of the width and height to create a circle
    backgroundColor: 'transparent',
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
      fontSize: 32,
  },
  titleText: {
      fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'Center',
  },
  background:{
    position: 'absolute',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  billBackground:{
    backgroundColor: 'white',
    padding: 20,
  },
  hamburgerMenu: {
    padding: 10,
  },
  hamburger: {
    width: 25,
    height: 3,
    backgroundColor: '#000',
    marginVertical: 3,
    borderRadius: 2,
  },
  tabBar: {
    flex: 0,
    backgroundColor: '#fff',
    height: 20,
    flexDirection: 'column',
  },
  searchBar: {
    flex: 0,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '85%',
    backgroundColor: 'white',
  },
  navigationContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  drawerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#ccc', // Adjust border color if needed
  },
  drawerButton: {
    padding: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#04ACD9DD'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default DashboardScreen;

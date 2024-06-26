import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../constants'
import {  Ionicons, Fontisto} from '@expo/vector-icons';
import { Carousel, Headings, ProductRow, Welcome } from '../components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {
 const navigation = useNavigation();
 const [userData, setUserData] = useState(null);
 const [userLoggedIn, setUserLoggedIn] = useState(false);
 const [cartCount, setCartCount] = useState("0");

  useEffect(() => {
    checkUserExistence();
  }, []);
  const checkUserExistence = async () => {
    const id = await AsyncStorage.getItem('id');
    const userID = `user${JSON.parse(id)}`
    try {
      const userData = await AsyncStorage.getItem(userID);
      if (userData !== null) {
        // User data exists
        const parsedData = JSON.parse(userData);
        // Use the retrieved data as needed
        setUserLoggedIn(true)
        setUserData(parsedData)
        // setUserLocation(userData.location)

        const count = await AsyncStorage.getItem('cartCount');

        if(count !== null){
          const parsedCart = JSON.parse(count);
          setCartCount(parsedCart)
        }else{
          return;
        }
        
      } else {
        return;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handlePress = () => {
    if (userLoggedIn) {
      navigation.navigate('Cart');
    } else {
      // Navigate to the Login page when hasId is false
      navigation.navigate('Login');
    }
  };



  return (
    <SafeAreaView>
        <ScrollView style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    
                <Ionicons name="location-outline" size={28} color="black" />
                <Text style={styles.location}>{userData ? userData.location : 'Shanghai, China'}</Text>
                    
            <View style={{ alignItems: "flex-end"}}>
                    <View style={styles.cartCounter}>
                         <Text style={styles.cartNumber}>{cartCount ? cartCount : 0}</Text>
                    </View>
                <TouchableOpacity onPress={()=> handlePress()}>
                    <Fontisto name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
            </View>
                </View>
        </ScrollView>
        <ScrollView>
           <View style={{marginHorizontal: 10}}>
           <Welcome/>
            <Carousel/>
            <Headings/>
            <ProductRow/>
           </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        
    },
    appBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    appBarWrapper:{
        marginHorizontal: 22,
        marginTop:12
    },
    location: {
        color: COLORS.gray,
        fontFamily: 'semibold',
        fontSize: SIZES.medium

    },
    cartCounter:{
        position: "absolute",
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
    },
    cartNumber:{
        fontWeight: "600",
        fontSize: 10,
        color: COLORS.white
    } 
})
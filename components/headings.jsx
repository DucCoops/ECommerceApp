import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from '../constants'

const Headings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
    <Text style={styles.headerTitle}>New Rivals</Text>
    <TouchableOpacity onPress={()=> navigation.navigate('New-Rivals')}>
    <Ionicons name="list" size={24} color={COLORS.primary} />
    </TouchableOpacity>
  </View>
    </View>
  )
}

export default Headings;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: -SIZES.xSmall,
    paddingRight:5
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: 'semibold',
    color: COLORS.black,
  },
  
});
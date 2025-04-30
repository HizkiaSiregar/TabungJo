// src/pages/HomeEmpty/index.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {ProfilePhoto} from '../../components/molecules';

const HomeEmpty = ({navigation}) => {
  console.log('Rendering HomeEmpty');
  
  const navigateToProfile = () => {
    console.log('Navigate to Profile');
    navigation.navigate('Profile');
  };
  
  const navigateToAddGoals = () => {
    console.log('Navigate to AddGoals');
    navigation.navigate('AddGoals');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>TabungJo!</Text>
          <ProfilePhoto onPress={navigateToProfile} />
        </View>
        
        {/* Banner Image */}
        <Image
          source={require('../../assets/save-image.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        
        {/* Main Content */}
        <Text style={styles.mainTitle}>Achieve Your Goals!</Text>
        
        <Text style={styles.quote}>
          "Menabung bukanlah tentang berapa banyak yang kamu simpan hari ini, 
          tapi tentang bagaimana kamu membangun masa depan yang lebih cerah 
          melalui langkah kecil yang konsisten. Setiap rupiah yang kamu sisihkan 
          adalah investasi untuk impianmu."
        </Text>
        
        {/* Empty State */}
        <Text style={styles.emptyStateMessage}>
          You don't have a goal to save yet.{'\n'}
          Let's start one now!
        </Text>
        
        <View style={styles.emptyStateBox}>
          <Text style={styles.emptyStateText}>
            No goal data has been saved yet
          </Text>
        </View>
        
        <Gap height={42} />
        
        {/* Add Goals Button */}
        <View style={styles.buttonContainer}>
          <Button 
            label="Add Goals" 
            onPress={navigateToAddGoals}
            color="#FBC028"
            textColor="#000000"
          />
        </View>
        
        <Gap height={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeEmpty;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    paddingHorizontal: 8,
  },
  appTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 40,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#0F3E48',
  },
  bannerImage: {
    width: '100%',
    height: 163,
    marginTop: 5,
  },
  mainTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 32,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#FBC028',
    marginTop: 23,
    marginLeft: 14,
  },
  quote: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000000',
    marginTop: 15,
    marginHorizontal: 32,
  },
  emptyStateMessage: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
    marginTop: 50,
  },
  emptyStateBox: {
    backgroundColor: '#D9D9D9',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    marginHorizontal: 38,
  },
  emptyStateText: {
    fontFamily: 'Inter-ExtraLight',
    fontSize: 15,
    fontWeight: '200',
    fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
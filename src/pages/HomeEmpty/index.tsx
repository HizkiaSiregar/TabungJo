// pages/HomeEmpty.tsx
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Logo, NullPhoto} from '../../assets'; // gunakan asset yang sudah ada
import {Gap} from '../../components/atoms'; // kalau ada Gap component

const HomeEmpty = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TabungJo!</Text>
        <Image source={NullPhoto} style={styles.profileIcon} />
      </View>

      {/* Image */}
      <Image source={Logo} style={styles.bannerImage} />

      {/* Section: Achieve Your Goals */}
      <View style={styles.achieveContainer}>
        <Text style={styles.achieveTitle}>Achieve Your Goals!</Text>
        <Text style={styles.achieveDescription}>
          "Menabung bukanlah tentang berapa banyak yang kamu simpan hari ini, 
          tapi tentang bagaimana kamu membangun masa depan yang lebih cerah 
          melalui langkah kecil yang konsisten. Setiap rupiah yang kamu sisihkan 
          adalah investasi untuk impianmu."
        </Text>
      </View>

      {/* Section: No Goal */}
      <View style={styles.noGoalContainer}>
        <Text style={styles.noGoalText}>
          You don't have a goal to save yet. {"\n"}Let's start one now!
        </Text>
        <View style={styles.nullDataBox}>
          <Text style={styles.nullDataText}>
            No goal data has been saved yet
          </Text>
        </View>
        <Gap height={16} />
        <TouchableOpacity 
          style={styles.addGoalButton} 
          onPress={() => navigation.navigate('AddGoal')}>
          <Text style={styles.addGoalButtonText}>Add Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0ECF8', // warna background biru muda
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
    fontStyle: 'italic',
  },
  profileIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  achieveContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  achieveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5A623', // kuning
    marginBottom: 8,
  },
  achieveDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  noGoalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  noGoalText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  nullDataBox: {
    marginTop: 16,
    width: '100%',
    height: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  nullDataText: {
    fontSize: 12,
    color: '#8D92A3',
  },
  addGoalButton: {
    marginTop: 16,
    backgroundColor: '#F5A623',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addGoalButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

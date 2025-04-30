// src/pages/HomeWithGoals/index.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {ProfilePhoto} from '../../components/molecules';

const HomeWithGoals = ({navigation}) => {
  // Sample goal data
  const goals = [
    {
      id: '1',
      name: 'Iphone 21 Pro max',
      target: '20.000',
      saved: '-',
      progress: 25, // percentage
    },
  ];

  const navigateToProfile = () => {
    console.log('Navigate to Profile');
    navigation.navigate('Profile');
  };

  const navigateToAddGoals = () => {
    console.log('Navigate to AddGoals');
    navigation.navigate('AddGoals');
  };

  const navigateToEditGoal = goalId => {
    console.log('Navigate to EditGoal', goalId);
    navigation.navigate('EditGoals', {goalId});
  };

  const navigateToAddSavings = goalId => {
    console.log('Navigate to AddSavings', goalId);
    navigation.navigate('AddSavings', {goalId});
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

        {/* Dream List */}
        <Text style={styles.dreamListTitle}>Dream List:</Text>

        {goals.map(goal => (
          <View key={goal.id} style={styles.goalCard}>
            <Text style={styles.goalName}>{goal.name}</Text>

            <View style={styles.goalInfoRow}>
              <Text style={styles.infoLabel}>Target : </Text>
              <Text style={styles.infoValue}>{goal.target}</Text>
            </View>

            <View style={styles.goalInfoRow}>
              <Text style={styles.infoLabel}>Stored : </Text>
              <Text style={styles.infoValue}>{goal.saved}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, {width: `${goal.progress}%`}]}
              />
            </View>

            <Text style={styles.progressText}>{goal.progress}%</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.goalButton}
                onPress={() => navigateToAddSavings(goal.id)}>
                <Text style={styles.goalButtonText}>Add Savings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.goalButton}
                onPress={() => navigateToEditGoal(goal.id)}>
                <Text style={styles.goalButtonText}>Edit Goals</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Gap height={20} />

        {/* Add Goals Button */}
        <View style={styles.addButtonContainer}>
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

export default HomeWithGoals;

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
    paddingHorizontal: 7,
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
    marginTop: 24,
    marginLeft: 14,
  },
  quote: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000000',
    marginTop: 22,
    marginHorizontal: 32,
  },
  dreamListTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    color: '#0F3E48',
    marginTop: 30,
    marginBottom: 10,
  },
  goalCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#E0E0E0',
  },
  goalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  goalInfoRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FBC028',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  goalButton: {
    backgroundColor: '#0F3E48',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 0.48,
    alignItems: 'center',
  },
  goalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignItems: 'center',
  },
});

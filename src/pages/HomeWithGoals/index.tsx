import React, {useEffect, useState} from 'react';
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
import {getAuth} from 'firebase/auth';
import {getUserProfile, fetchGoals} from '../../services/firebase';

const HomeWithGoals = ({navigation}) => {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState({
    username: '',
    photo: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigation.replace('SignIn');
      return;
    }

    const uid = currentUser.uid;

    // Get user profile
    const unsubscribeUser = getUserProfile(uid, userData => {
      if (userData) {
        setUser({
          username: userData.username || 'User',
          photo: userData.photo ? {uri: userData.photo} : null,
        });
      }
    });

    // Get goals
    const unsubscribeGoals = fetchGoals(uid, goalsData => {
      setGoals(goalsData);
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
      unsubscribeGoals();
    };
  }, [navigation]);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToAddGoals = () => {
    navigation.navigate('AddGoals');
  };

  const navigateToEditGoal = goalId => {
    navigation.navigate('EditGoals', {goalId});
  };

  const navigateToAddSavings = goalId => {
    navigation.navigate('AddSavings', {goalId});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>{`Hi, ${user.username}`}</Text>
            <Text style={styles.appSubTitle}>
              Have you track your money today?
            </Text>
          </View>
          <ProfilePhoto onPress={navigateToProfile} source={user.photo} />
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

        {goals.length === 0 && !loading ? (
          <View style={styles.emptyStateBox}>
            <Text style={styles.emptyStateText}>
              No goal data has been saved yet
            </Text>
          </View>
        ) : (
          goals.map(goal => (
            <View key={goal.id} style={styles.goalCard}>
              <Text style={styles.goalName}>{goal.name}</Text>
              <View style={styles.goalInfoRow}>
                <Text style={styles.infoLabel}>Target : </Text>
                <Text style={styles.infoValue}>{goal.targetAmount}</Text>
              </View>
              <View style={styles.goalInfoRow}>
                <Text style={styles.infoLabel}>Stored : </Text>
                <Text style={styles.infoValue}>{goal.savedAmount || '0'}</Text>
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
          ))
        )}

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
    paddingHorizontal: 12,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: '#020202',
  },
  appSubTitle: {
    fontFamily: 'Inter-Light',
    fontSize: 14,
    color: '#8D92A3',
  },
  photo: {
    height: 70,
    width: 70,
    borderRadius: 10,
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
});

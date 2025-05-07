import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  get,
  update,
  remove,
} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Authentication Services
export const signIn = async (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email, password, userData) => {
  const auth = getAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);

  // Save additional user data to the database
  const db = getDatabase();
  await set(ref(db, `users/${result.user.uid}`), {
    ...userData,
    email: email,
    createdAt: new Date().toISOString(),
  });

  return result;
};

export const logOut = async () => {
  const auth = getAuth();
  return signOut(auth);
};

// User Profile Services
export const updateUserProfile = async (uid, userData) => {
  const db = getDatabase();
  return update(ref(db, `users/${uid}`), userData);
};

export const getUserProfile = (uid, callback) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}`);

  return onValue(userRef, snapshot => {
    const data = snapshot.val();
    callback(data);
  });
};

// Profile Picture Upload directly to Realtime Database
export const uploadProfilePicture = async (uri, uid) => {
  try {
    // Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          // Get base64 string (reader.result includes the data URI prefix)
          const base64String = reader.result;
          
          // Update user profile directly in Realtime Database
          const db = getDatabase();
          await update(ref(db, `users/${uid}`), { 
            photo: base64String 
          });
          
          // Return the base64 string for immediate use in UI
          resolve(base64String);
        } catch (error) {
          console.error("Error updating database:", error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      
      // Read the blob as a Data URL (base64)
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error in upload process:", error);
    throw error;
  }
};

// Goals Services
export const createGoal = async (uid, goalData) => {
  try {
    const db = getDatabase();
    const goalsRef = ref(db, `users/${uid}/goals`);

    // Generate a unique ID for the goal
    const newGoalRef = push(goalsRef);

    // Set the data with the new ID
    await set(newGoalRef, {
      ...goalData,
      id: newGoalRef.key,
      createdAt: new Date().toISOString(),
      savedAmount: parseInt(goalData.initialSaving || '0', 10),
      progress: 0,
    });

    return newGoalRef.key;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const fetchGoals = (uid, callback) => {
  const db = getDatabase();
  const goalsRef = ref(db, `users/${uid}/goals`);

  // Listen for changes to goals
  return onValue(goalsRef, snapshot => {
    const data = snapshot.val();
    const goalsArray = [];

    if (data) {
      // Convert the object to an array
      Object.keys(data).forEach(key => {
        const goal = data[key];
        // Calculate progress
        const savedAmount = parseInt(goal.savedAmount || 0, 10);
        const targetAmount = parseInt(goal.targetAmount || 1, 10);
        const progress = Math.min(
          Math.round((savedAmount / targetAmount) * 100),
          100,
        );

        goalsArray.push({
          ...goal,
          progress,
        });
      });
    }

    callback(goalsArray);
  });
};

export const updateGoal = async (uid, goalId, updatedData) => {
  try {
    const db = getDatabase();
    const goalRef = ref(db, `users/${uid}/goals/${goalId}`);

    await update(goalRef, updatedData);

    return true;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoal = async (uid, goalId) => {
  try {
    const db = getDatabase();
    const goalRef = ref(db, `users/${uid}/goals/${goalId}`);

    await remove(goalRef);

    return true;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

// Savings Services
export const addSaving = async (uid, goalId, amount) => {
  try {
    const db = getDatabase();
    const goalRef = ref(db, `users/${uid}/goals/${goalId}`);

    // Get the current goal data
    const snapshot = await get(goalRef);
    const goalData = snapshot.val();

    if (!goalData) {
      throw new Error('Goal not found');
    }

    // Calculate the new saved amount
    const currentAmount = parseInt(goalData.savedAmount || 0, 10);
    const addedAmount = parseInt(amount, 10);
    const newAmount = currentAmount + addedAmount;

    // Calculate new progress
    const targetAmount = parseInt(goalData.targetAmount || 1, 10);
    const progress = Math.min(
      Math.round((newAmount / targetAmount) * 100),
      100,
    );

    // Create a history record
    const savingHistoryRef = push(
      ref(db, `users/${uid}/goals/${goalId}/savingHistory`),
    );
    await set(savingHistoryRef, {
      id: savingHistoryRef.key,
      amount: addedAmount,
      date: new Date().toISOString(),
    });

    // Update the total saved amount and progress
    await update(goalRef, {
      savedAmount: newAmount,
      progress: progress,
    });

    return {newAmount, progress};
  } catch (error) {
    console.error('Error adding saving:', error);
    throw error;
  }
};

export const fetchSavingHistory = (uid, goalId, callback) => {
  const db = getDatabase();
  const historyRef = ref(db, `users/${uid}/goals/${goalId}/savingHistory`);

  return onValue(historyRef, snapshot => {
    const data = snapshot.val();
    const historyArray = [];

    if (data) {
      // Convert the object to an array
      Object.keys(data).forEach(key => {
        historyArray.push(data[key]);
      });

      // Sort by date (newest first)
      historyArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    callback(historyArray);
  });
};

// Reset User Data
export const deleteUserData = async uid => {
  try {
    const db = getDatabase();
    const userGoalsRef = ref(db, `users/${uid}/goals`);

    // Delete all goals
    await remove(userGoalsRef);

    // Optionally, also delete the profile picture from storage
    const storage = getStorage();
    const profilePicRef = storageRef(storage, `profile_pictures/${uid}`);

    try {
      await deleteObject(profilePicRef);
    } catch (error) {
      // Ignore if file doesn't exist
      console.log('Profile picture may not exist:', error);
    }

    return true;
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
};

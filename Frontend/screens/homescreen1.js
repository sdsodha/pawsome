import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    // Save user data to MongoDB collection on component mount
    // saveUserDataToMongoDB();
    fetchCurrentUserId();
  }, []);

  const fetchCurrentUserId = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        const foundUser = data.find((user) => user.uid === currentUser.uid);
        if (foundUser) {
          setCurrentUserId(foundUser._id);
        } else {
          console.log('User not found in the server data');
        }
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error(error);
    }
  };


  // const saveUserDataToMongoDB = async () => {
  //   try {
  //     const currentUser = auth.currentUser;
  //     if (currentUser) {
  //       const { email, uid } = currentUser;

  //       // Make HTTP POST request to your API endpoint
  //       const response = await fetch('http://localhost:8080/users', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           uid,
  //           email,
  //         }),
  //       });

  //       if (response.ok) {
  //         console.log('User data saved to MongoDB');
  //       } else {
  //         console.log('User is already saved to MongoDB');
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen</Text>
      <Text>Your user Object Id is {currentUserId}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>UID {auth.currentUser?.uid}</Text>
      <Button
        title="Go to Pet Form"
        onPress={() => navigation.navigate('PetForm')}
      />
      <Button
        title="Go to Pet Screen"
        onPress={() => navigation.navigate('PetComponent')}
      />
      <Button
        title="Go to Leaderboard"
        onPress={() => navigation.navigate('UserListComponent')}
      />
      

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

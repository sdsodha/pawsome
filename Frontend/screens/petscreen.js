import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
// import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';
import ProgressBar from 'react-native-progress/Bar';
import { auth } from '../firebase';
import axios from 'axios';

const PetComponent = () => {
  const navigation = useNavigation();
  const [mood, setMood] = useState(20);
  const [health, setHealth] = useState(20);
  const [textInputValue, setTextInputValue] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [petFormData, setPetFormData] = useState(null);

  const [progress, setProgress] = useState(0);

  const handleIncreasePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  const handleDecreasePress = () => {
    setProgress((prevProgress) => prevProgress - 0.1);
  };

  useEffect(() => {
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

  useEffect(() => {
    const fetchPetFormData = async (currentUserId) => {
      try {
        // Make a GET request to the backend API to fetch the pet form data
        const response = await axios.get(
          `http://localhost:8080/users/${currentUserId}/pet-form`,
        );
        setPetFormData(response.data);
        console.log(response.data);
      } catch (error) { 
        console.error('Error fetching pet form data:', error);
      }
    };
    if (currentUserId) {
      fetchPetFormData(currentUserId);
    }
  }, [currentUserId]);


  return (
    <View style={styles.container}>
      <Text>Welcome to the Pet Screen</Text>
      <Button
        title="Go to Pet Form"
        onPress={() => navigation.navigate('PetForm')}
      />
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Leaderboard"
        onPress={() => navigation.navigate('UserListComponent')}
      />

      <Text style={styles.title}>Your Personal Preferences</Text>
      <Text>Selected Picture: {petFormData?.selectedPicture}</Text>
      <Text>Your current User ID: {currentUserId}</Text>
      <Image source={require('../assets/picture3.jpg')} style={styles.image} />

      <Text>Difficulty Level: {petFormData?.difficulty}</Text>
      <Text>Name: {petFormData?.name}</Text>
      <Text>Breed: {petFormData?.breed}</Text>
      <Text>Sex: {petFormData?.sex}</Text>

      <Text style={styles.label}>Mood:</Text>
      <ProgressBar progress={progress} width={200} height={20} />
      <Button onPress={handleIncreasePress} title="Increase progress" />
      <Button onPress={handleDecreasePress} title="Decrease progress" />
      <Text>Progress: {(progress * 100).toFixed(0)}%</Text>

      <Text style={styles.label}>Health:</Text>
      <ProgressBar progress={0.5} width={200} height={20} />

      <Text style={styles.label}>Food:</Text>
      <ProgressBar progress={0.5} width={200} height={20} />

      <Text style={styles.label}>Water:</Text>
      <ProgressBar progress={0.5} width={200} height={20} />

      <Text style={styles.label}>Treat:</Text>
      <ProgressBar progress={0.5} width={200} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});

export default PetComponent;

// <ProgressBarAndroid
//         styleAttr="Horizontal"
//         indeterminate={false}
//         progress={mood}
//         color="#ffcc00"
//       />

//https://medium.com/@jujunsetiawan10/how-to-create-progress-bar-in-react-native-f27ae2871ac3

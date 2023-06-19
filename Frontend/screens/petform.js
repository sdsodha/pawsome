import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase';

const PetForm = () => {
    const navigation = useNavigation()
  const [difficulty, setDifficulty] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');

  const [currentUserId, setCurrentUserId] = useState('');

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

  const handleSubmit = (currentUserId) => {
    // Perform form submission logic here
    // You can access the selected values using the state variables
    const formData = {
      user: currentUserId,
      difficulty: difficulty,
      name: name,
      breed: breed,
      sex: sex,
      selectedPicture: selectedPicture,
    };

    console.log(formData);

    fetch(`http://localhost:8080/users/pet-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error);
      });
    // Clear the form fields after submission
    Alert.alert('Form Saved', 'The form has been successfully saved.');
    setDifficulty('');
    setName('');
    setBreed('');
    setSex('');
    setSelectedPicture('');
  };


  return (
    <View style={styles.container}>
    <Text>Welcome to the Pet Form</Text>
      <Button
        title="Go to Pet Screen"
        onPress={() => navigation.navigate('PetComponent')}
      />
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
      title="Go to Leaderboard"
      onPress={() => navigation.navigate('UserListComponent')}
    />
      <Text style={styles.title}>Pet Form</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Difficulty Level:</Text>
        <Picker
          style={styles.picker}
          selectedValue={difficulty}
          onValueChange={(value) => setDifficulty(value)}
        >
          <Picker.Item label="Select Difficulty" value="" />
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Breed:</Text>
        <TextInput style={styles.input} value={breed} onChangeText={(text) => setBreed(text)} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Sex:</Text>
        <Picker
          style={styles.picker}
          selectedValue={sex}
          onValueChange={(value) => setSex(value)}
        >
        <Picker.Item label="Select value" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Picture:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedPicture}
          onValueChange={(value) => setSelectedPicture(value)}
        >
          <Picker.Item label="Select Picture" value="" />
          <Picker.Item label="Picture 1" value="picture1" />
          <Picker.Item label="Picture 2" value="picture2" />
          <Picker.Item label="Picture 3" value="picture3" />
          <Picker.Item label="Picture 4" value="picture4" />
          <Picker.Item label="Picture 5" value="picture5" />
        </Picker>
      </View>

      <Text style={styles.label}>Pictures:</Text>
      <View style={styles.pictureContainer}>
        <View style={styles.pictureItem}>
          <Image
            source={require('../assets/picture1.jpg')}
            style={styles.picture}
          />
          <Text style={styles.pictureLabel}>Picture 1</Text>
        </View>
        <View style={styles.pictureItem}>
          <Image
            source={require('../assets/picture2.jpg')}
            style={styles.picture}
          />
          <Text style={styles.pictureLabel}>Picture 2</Text>
        </View>
        <View style={styles.pictureItem}>
          <Image
            source={require('../assets/picture3.jpg')}
            style={styles.picture}
          />
          <Text style={styles.pictureLabel}>Picture 3</Text>
        </View>
        <View style={styles.pictureItem}>
          <Image
            source={require('../assets/picture4.jpg')}
            style={styles.picture}
          />
          <Text style={styles.pictureLabel}>Picture 4</Text>
        </View>
        <View style={styles.pictureItem}>
          <Image
            source={require('../assets/picture5.jpg')}
            style={styles.picture}
          />
          <Text style={styles.pictureLabel}>Picture 5</Text>
        </View>
      </View>
      
      <Button title="Submit"  onPress={() => handleSubmit(currentUserId)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pictureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pictureItem: {
    width: '20%',
    marginBottom: 16,
    alignItems: 'center',
  },
  picture: {
    width: 100,
    height: 100,
  },
  pictureLabel: {
    marginTop: 8,
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

export default PetForm;

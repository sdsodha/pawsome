import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../config/firebase';
import Carousel from 'react-native-reanimated-carousel';
import { Select } from 'native-base';


const PetSelectScreen = () => {
    const navigation = useNavigation()
    const [difficulty, setDifficulty] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [selectedPicture, setSelectedPicture] = useState('');

    const [currentUserId, setCurrentUserId] = useState('');

    const width = Dimensions.get('window').width;
    const picList = [];
    picList.push('../../../assets/picture1.jpg');
    picList.push('../../../assets/picture2.jpg');
    picList.push('../../../assets/picture3.jpg');
    picList.push('../../../assets/picture4.jpg');
    picList.push('../../../assets/picture5.jpg');

    const data = [
        { color: 'red' },
        { color: 'purple' },
        { color: 'blue' },
        { color: 'yellow' },
        { color: 'green' },
        { color: 'pink' },
        { color: 'white' },
    ];


    useEffect(() => {

//        fetchCurrentUserId();
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
                    console.log("User Found", foundUser._id);
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

        // fetch(`http://localhost:8080/users/pet-form`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle the response data
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         // Handle any error that occurred during the request
        //         console.error(error);
        //     });

        // Clear the form fields after submission
        Alert.alert('Form Saved', 'The form has been successfully saved.');
        setDifficulty('');
        setName('');
        setBreed('');
        setSex('');
        setSelectedPicture('');
        navigation.navigate("Home")
    };


    return (
        <View style={styles.container}>
            {/* 
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
    */}


            <Text style={styles.title}>Select Your Pet</Text>


            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Difficulty Level:</Text>
                <View style={styles.picker}>
                    <Select
                        selectedValue={difficulty}
                        onValueChange={(value) => setDifficulty(value)}
                    >
                        <Select.Item label="Select Difficulty" value="" />
                        <Select.Item label="Easy" value="easy" />
                        <Select.Item label="Medium" value="medium" />
                        <Select.Item label="Hard" value="hard" />
                    </Select>
                </View>
            </View>

            <Text style={styles.label}>Pictures:</Text>
            <View style={styles.pictureContainer}>
                <View style={styles.pictureItem}>
                    <Image
                        source={require('../../../assets/picture1.jpg')}
                        style={styles.picture}
                    />
                    <Text style={styles.pictureLabel}>Picture 1</Text>
                </View>
                <View style={styles.pictureItem}>
                    <Image
                        source={require('../../../assets/picture2.jpg')}
                        style={styles.picture}
                    />
                    <Text style={styles.pictureLabel}>Picture 2</Text>
                </View>
                <View style={styles.pictureItem}>
                    <Image
                        source={require('../../../assets/picture3.jpg')}
                        style={styles.picture}
                    />
                    <Text style={styles.pictureLabel}>Picture 3</Text>
                </View>
                <View style={styles.pictureItem}>
                    <Image
                        source={require('../../../assets/picture4.jpg')}
                        style={styles.picture}
                    />
                    <Text style={styles.pictureLabel}>Picture 4</Text>
                </View>
                <View style={styles.pictureItem}>
                    <Image
                        source={require('../../../assets/picture5.jpg')}
                        style={styles.picture}
                    />
                    <Text style={styles.pictureLabel}>Picture 5</Text>
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Picture:</Text>
                <View style={styles.picker}>
                    <Select
                        selectedValue={selectedPicture}
                        onValueChange={(value) => setSelectedPicture(value)}
                    >
                        <Select.Item label="Select Picture" value="" />
                        <Select.Item label="Picture 1" value="picture1" />
                        <Select.Item label="Picture 2" value="picture2" />
                        <Select.Item label="Picture 3" value="picture3" />
                        <Select.Item label="Picture 4" value="picture4" />
                        <Select.Item label="Picture 5" value="picture5" />
                    </Select>
                </View>
            </View>

            {/* 
      <View style={{ flex: 1 }}>
        <Carousel
          width={width}
          height={width / 2}
          data={picList}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 30 }}>
                {index}
              </Text>
            </View>
          )}
        />
      </View>
 */}
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
                <View style={styles.picker}>
                    <Select
                        selectedValue={sex}
                        onValueChange={(value) => setSex(value)}
                    >
                        <Select.Item label="Select value" value="" />
                        <Select.Item label="Male" value="male" />
                        <Select.Item label="Female" value="female" />
                    </Select>
                </View>
            </View>


            <Button title="Submit" onPress={() => handleSubmit(currentUserId)} />
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

export default PetSelectScreen;

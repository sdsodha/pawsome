import React, { useState, useEffect } from 'react';
import { View, Text,StatusBar, KeyboardAvoidingView,TextInput, Button, Image,TouchableOpacity,Pressable, StyleSheet,SafeAreaView,ScrollView,FlatList, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../config/firebase';
import Carousel from 'react-native-reanimated-carousel';
import { Select } from 'native-base';
import styles from '../style';
import { SliderBox } from 'react-native-image-slider-box';
const Separator = () => <View style={styles.separator} />;


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


    const [images, setImages] = React.useState([
        require('../../../assets/happy_cat.png'),
        require('../../../assets/happy_owl.png'),
        require('../../../assets/happy_pig.png')
   
        
    ]);
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
        navigation.navigate("Home")
    };


    return (
        <ScrollView>
        <KeyboardAvoidingView>
        
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


            
            <Separator/>
           
            
            <View style={styles.buttonContainer}>
                    <Text style={styles.label}>Difficulty Level</Text>
                <View style={styles.fixToText}>
                    <Button style={styles.button} title="Easy" onPress={() => handleSubmit(currentUserId)} />
                    <Button style={styles.button} title="Medium" onPress={() => handleSubmit(currentUserId)} />
                    <Button style={styles.button} title="Hard" onPress={() => handleSubmit(currentUserId)} />
                </View>
            </View>
            
            
            <Text style={styles.label}>Choose Pet</Text>
            <Separator/>
            <View style={styles.container}>
            <SliderBox 
                images={images}
                sliderBoxHeight={300}
                dotColor={styles.primaryColor}
                inactiveDotColor="#ff0000"  
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                paginationBoxVerticalPadding={15}
               
                autoplayInterval={3000}
                resizeMode='stretch'
                circleLoop
            />
            
            <View style={styles.inputContainer}>
                <Button title="Select" style={styles.button} onPress={() => handleSubmit(currentUserId)} />
            </View>
            
        </View>
        <Separator/>
          

           

      

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
       
        </KeyboardAvoidingView>
        </ScrollView>
     
       
    );
};
export default PetSelectScreen;

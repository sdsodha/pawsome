import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, KeyboardAvoidingView, TextInput, Button, Image, TouchableOpacity, Pressable, StyleSheet, SafeAreaView, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../config/firebase';
import styles from '../style';
import { Pets } from '../../data/PetObject';
import { ButtonGroup } from "react-native-elements";
import Carousel from "react-native-reanimated-carousel";

const Separator = () => <View style={styles.separator} />;

const PetSelectScreen = () => {
    const navigation = useNavigation()
    const [difficulty, setDifficulty] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [selectedPet, setSelectedPet] = useState(0);
    const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);

    const [currentUserId, setCurrentUserId] = useState('');

    const width = Dimensions.get('window').width;
    
    const ref = React.useRef(null);

    const [images, setImages] = React.useState([
        Pets[0].imageSrc,
        Pets[1].imageSrc,
        Pets[2].imageSrc
    ]);

    const imageData = [
        Pets[0].imageSrc,
        Pets[1].imageSrc,
        Pets[2].imageSrc
    ]

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
            selectedPicture: selectedPet,
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
        setSelectedPet('');
        navigation.navigate("Home", { selectedPet: selectedPet })
    };


    return (
        <ScrollView>
            <KeyboardAvoidingView>

                <View style={styles.container}>
                    <Separator />

                    <View style={styles.buttonContainer}>
                        <Text style={styles.label}>Difficulty Level</Text>
                        <ButtonGroup
                            buttons={['Easy', 'Medium', 'Hard']}
                            selectedIndex={selectedDifficultyIndex}
                            onPress={(value) => {
                                setSelectedDifficultyIndex(value);
                            }}
                            containerStyle={{ marginBottom: 20 }}
                        />
                        {/* <View style={styles.fixToText}>
                            <Button style={styles.button} title="Easy" onPress={() => { }} />
                            <Button style={styles.button} title="Medium" onPress={() => { }} />
                            <Button style={styles.button} title="Hard" onPress={() => { }} />
                        </View> */}
                    </View>


                    <Text style={styles.label}>Choose Pet</Text>
                    <Separator />

                    {/* <View style={styles.container}>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={200}
                            sliderBoxWidth={200}
                            dotColor={styles.primaryColor}
                            inactiveDotColor="#ff0000"
                            paginationBoxVerticalPadding={10}
                            currentImageEmitter={index => {
                                setSelectedPet(index)
                            }}
                            resizeMode='center'
                        />
                    </View> */}

                    <View>
                        <Carousel
                            loop
                            width={width * .8}
                            height={width * .8}
                            data={images}
                            pagingEnabled={true}
                            ref={ref}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => setSelectedPet(index)}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        width: 100,
                                        height: 100
                                    }}
                                >
                                    <Image
                                        source={item}
                                    />
                                </View>
                                    
                            )}
                    />
                    </View>

                    <Separator />

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} />
                    </View>

                    <Button title="Submit" onPress={() => handleSubmit(currentUserId)} />
                </View>

            </KeyboardAvoidingView>
        </ScrollView>

    );
};
export default PetSelectScreen;

/* <Button
                                        title="<"
                                        onPress={() => {
                                            ref.current ?.scrollTo({ count: -1, animated: true });
                                        }}
                                    />
                                    <Button
                                        title=">"
                                        onPress={() => {
                                            ref.current ?.scrollTo({ count: 1, animated: true });
                                        }}
                                    /> */
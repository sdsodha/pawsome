import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Alert,
    Button,
} from 'react-native';
//import { useNavigation } from '@react-navigation/core';
import ProgressBar from 'react-native-progress/Bar';
import { auth } from '../../config/firebase';
import axios from 'axios';
import { Video, ResizeMode } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import { Select } from 'native-base';
import { Activity } from '../../data/ActivityObject';

const PetLeftComponent = ({ route, navigation }) => {


    const { food, water, treat, selectedPet, petName } = route.params;

    useEffect(() => {
        if (route.params?.food) {
            setFood(foodCount + food);
        }
        if (route.params?.water) {
            setWater(waterCount + water);
        }
        if (route.params?.treat) {
            setTreat(treatCount + treat);
        }
    }, [route.params?.food, route.params?.water, route.params?.treat]);

    const [mood, setMood] = useState(0);
    const [health, setHealth] = useState(0);
    const [currentUserId, setCurrentUserId] = useState('');
    const [petFormData, setPetFormData] = useState(null);

    const [moodProgress, setMoodProgress] = useState(0.5);
    const [healthProgress, setHealthProgress] = useState(0.5);

    const [modalVisible, setModalVisible] = useState(false);

    const [foodCount, setFood] = useState(food);
    const [waterCount, setWater] = useState(water);
    const [treatCount, setTreat] = useState(treat);
    const [selectedActivity, setSelectedActivity] = useState(0);

    const [pet, setPet] = useState(selectedPet);
    const [prompt, setPrompt] = useState('');

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleMoodProgress = (x, y, z) => {
        setMoodProgress((prevProgress) => prevProgress + z * 0.2 - x * .1 - y * 0.1);
        console.log("Mood", moodProgress);
    };

    const handleHealthProgress = (x, y, z) => {
        setHealthProgress((prevProgress) => prevProgress + x * 0.1 + y * 0.1 - z * 0.2);
    };

    // useEffect(() => {
    //   //fetchCurrentUserId();
    // }, []);

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
            //      fetchPetFormData(currentUserId);
        }
    }, [currentUserId]);

    // Pet States //////////////////////////////////////////////////////////////////
    useEffect(() => {

        setMoodProgress(mood / 100);
        setHealthProgress(health / 100);

    }, [mood, health]);

    const onFoodPress = () => {
        if (foodCount <= 0) {
            setModalVisible(!modalVisible);
            return;
        }

        setFood(foodCount - 1);
        setHealth(health + 5);
        setMood(mood + 1);
    }

    const onWaterPress = () => {
        if (waterCount <= 0) {
            setModalVisible(!modalVisible);
            return;
        }

        setWater(waterCount - 1);
        setHealth(health + 3);
        setMood(mood + 1);
    }

    const onTreatPress = () => {
        if (treatCount <= 0) {
            setModalVisible(!modalVisible);
            return;
        }

        setTreat(treatCount - 1);
        setHealth(health + 1);
        setMood(mood + 5);
    }

    const onOneDayButtonPressed = () => {
        setHealth(20);
        setMood(20);
    }

    const onTwoDayButtonPressed = () => {
        setHealth(0);
        setMood(0);
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Image
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    resizeMode='contain'
                    source={require("../../../assets/activityIcons/exclamationMark.png")}
                />

                <Text style={styles.propmtText}>Your Pet has left you, but you can bring it back by doing any activity 50 times 3 days in a row.</Text>

                <View style={styles.dayContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            style={{ width: 30, height: 30, marginBottom: 8 }}
                            resizeMode='contain'
                            source={require("../../../assets/activityIcons/okButton.png")}
                        />
                        <Text>Day 1</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            style={{ width: 30, height: 30, marginBottom: 8 }}
                            resizeMode='contain'
                            source={require("../../../assets/activityIcons/okButton.png")}
                        />
                        <Text>Day 2</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            style={{ width: 30, height: 30, marginBottom: 8, opacity: .5 }}
                            resizeMode='contain'
                            source={require("../../../assets/activityIcons/okButton.png")}
                        />
                        <Text>Day 3</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={onFoodPress}
                    >
                        <Image
                            style={styles.buttonIcon}
                            source={require("../../../assets/activityIcons/emptyFood.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onTreatPress}
                    >
                        <Image
                            style={styles.buttonIcon}
                            source={require("../../../assets/activityIcons/emptyTreat.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onWaterPress}
                    >
                        <Image
                            style={styles.buttonIcon}
                            source={require("../../../assets/activityIcons/emptyWater.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.moodHealthContainer}>
                    <Text style={styles.label}>Mood</Text>
                    <ProgressBar progress={moodProgress} width={320} height={15} borderWidth={0} borderRadius={10} unfilledColor='#B9B9B9' color="#6A5ACD" />

                    <Text style={styles.label}>Health</Text>
                    <ProgressBar progress={healthProgress} width={320} height={15} borderWidth={0} borderRadius={10} unfilledColor='#B9B9B9' color="#6A5ACD" />
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            //                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image
                                    style={styles.image}
                                    source={require("../../../assets/activityIcons/Food.png")}
                                ></Image>
                                <Text style={styles.modalText}>You dont have enough</Text>
                                <Text style={styles.modalText}>Start an activity to earn food and take care of your pet.</Text>

                                <View style={styles.button}>
                                    <Button title='Start'
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                            navigation.navigate("ActivitySelectionScreen")
                                        }
                                        } />
                                    <Button title='Cancel'
                                        onPress={() => setModalVisible(!modalVisible)} />
                                </View>
                                {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable> */}
                            </View>
                        </View>
                    </Modal>
                </View>
                {/* 
      <Text> Params - {food} {water} {treat}</Text> */}

                <View style={styles.activityContainer}>
                    <View style={styles.activitySelectionContainer}>
                        <Select
                            selectedValue={selectedActivity}
                            onValueChange={(value) => setSelectedActivity(value)}
                        >
                            <Select.Item label={Activity[0].type} value={0} />
                            <Select.Item label={Activity[1].type} value={1} />
                            <Select.Item label={Activity[2].type} value={2} />
                        </Select>
                    </View>
                </View>

                <View style={styles.startActivityButtonContainer}>
                    <TouchableOpacity style={styles.startActivityButton}
                        onPress={() => {
                            navigation.navigate("PetLeftActivityProgressScreen", {
                                activity: selectedActivity,
                                item: 0,
                                activityDifficulty: 0,
                                itemGoal: 10,
                                activityGoal: 50
                            })
                        }}>
                        <Text style={{ color: 'white' }}>Start Activity</Text>
                    </TouchableOpacity>
                </View>

                {/*         
        <Button title="1 Day Gone" onPress={onOneDayButtonPressed} />
        <Button title="2 Days Gone" onPress={onTwoDayButtonPressed} /> 
*/}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: '100%',
        marginTop: 15,
    },
    activitySelectionContainer: {
        marginTop: 10,
        width: 320,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        backgroundColor: 'white'
    },
    activityContainer: {
        marginBottom: 15,
    },
    inventoryContainer: {
        marginTop: 5,
        width: 320,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        backgroundColor: 'white'
    },
    itemContainer: {
        marginLeft: 10,
        gap: 5,
        marginBottom: 10,
    },
    inventoryButton: {
        justifyContent: 'left',
        alignItems: 'left',
        fontSize: 18,
        width: 320,
        padding: 15,
    },
    startActivityButtonContainer: {
        marginVertical: 30,
        width: 320,
        borderRadius: 8,
        backgroundColor: '#37298A'
    },
    startActivityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5ACD',
        fontSize: 18,
        width: 320,
        border: '#9c92da 1px',
        borderRadius: 8,
        padding: 10,
        marginBottom: 4,
    },
    moodHealthContainer: {
        alignItems: 'left',
        justifyContent: 'left',
    },
    moodHealthProgressBar: {
        width: 320,
        height: 15,
    },
    propmtText: {
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'white',
        height: '100%'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
        marginTop: 8,
    },
    buttonIcon: {
        width: 50,
        height: 50,
        marginBottom: 8,
        marginTop: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 6,
    },
    button: {
        flex: 0,
        flexDirection: 'row',
        gap: 60,
        padding: 10
    },
    video: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 320,
        height: 320,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default PetLeftComponent;

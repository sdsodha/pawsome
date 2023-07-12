import { View, Text, Button, StyleSheet, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Video, ResizeMode } from 'expo-av';
import * as Progress from 'react-native-progress';
import { Activity } from '../../data/ActivityObject';

const ActivityProgress = ({ route, navigation }) => {

    const { activity, item, activityDifficulty, itemGoal, activityGoal } = route.params;

    const [counter, setCounter] = useState(0);

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const [xCounter, setXCounter] = useState(0);
    const [xMove, setXMove] = useState(false);

    const [yCounter, setYCounter] = useState(0);
    const [yMove, setYMove] = useState(false);

    const [zCounter, setZCounter] = useState(0);
    const [zMove, setZMove] = useState(false);

    const [activityProgress, setMoodProgress] = useState(0);
    const [itemProgress, setHealthProgress] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    //Anim vars
    const video2 = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const updateCount = () => {
        switch (activity) {
            case 0: {
                setCounter(xCounter);
                break;
            }
            case 1: {
                setCounter(yCounter);
                break;
            }
            case 2: {
                setCounter(zCounter);
                break;
            }
        }
        console.log("Activity Count - ", counter);
    }

    //Sensor code
    const _slow = () => Accelerometer.setUpdateInterval(500);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(setData)
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        updateMovement();
        return () => _unsubscribe();
    }, [x, y, z]);

    const updateMovement = () => {
        if (x >= 1) {
            setXMove(true);
        }
        if (xMove === true && (x <= -1)) {
            setXCounter(xCounter + 1);
            setXMove(false);
            console.log("X count - ", xCounter);
            updateCount();
        }

        if (y >= 1) {
            setYMove(true);
        }
        if (yMove === true && (y <= -1)) {
            setYCounter(yCounter + 1);
            setYMove(false);
            console.log("Y count - ", yCounter);
            updateCount();
        }

        if (z >= 1) {
            setZMove(true);
        }
        if (zMove === true && (z <= -1)) {
            setZCounter(zCounter + 1);
            setZMove(false);
            console.log("Z count - ", zCounter);
            updateCount();
        }

    }

    const onActivityDone = () => {

        let param;

        switch (item) {
            case 0:
                param = { food: parseInt(itemGoal), water: 0, treat: 0 };
                break;
            case 2:
                param = { food: 0, water: parseInt(itemGoal), treat: 0 };
                break;
            case 1:
                param = { food: 0, water: 0, treat: parseInt(itemGoal) };
                break;
        }

        navigation.navigate({
            name: 'PetHomeScreen',
            params: param,
            merge: true,
        })
    }

    const onViewInstructions = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <View>
            <Button
                title={"View Instructions"}
                onPress={onViewInstructions}
            />

            <Progress.Circle progress={counter / parseInt(activityGoal)} size={300} showsText={true} />

            <Button
                title="Pause"
                onPress={onActivityDone} />

            <Button
                title="End Activity"
                onPress={onActivityDone} />

            <Text>Movement:</Text>
            <Progress.Bar progress={counter / parseInt(activityGoal)} width={200} height={20} />

            <Text>Item:</Text>
            <Progress.Bar progress={(counter / parseInt(activityGoal))} width={200} height={20} />

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={styles.modalText}>{Activity[activity].type}</Text>
                            
                                <Video
                                    ref={video2}
                                    style={styles.video}
                                    source={Activity[activity].trainingVideoSrc}
                                    useNativeControls={false}
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping
                                    useNativeControls
                                    shouldPlay={true}
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                            

                            <View style={styles.button}>
                                <Button title='Close'
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

        </View>
    )
}

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
    button: {
        flex: 0,
        flexDirection: 'row',
        gap: 40,
        padding: 10
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
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


export default ActivityProgress
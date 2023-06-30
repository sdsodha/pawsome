import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import ProgressBar from 'react-native-progress/Bar';


const ActivityProgress = ({ route, navigation }) => {

    const { activity, item , activityDifficulty, itemGoal, activityGoal } = route.params;

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

    const updateCount = () => {
        switch (activity) {
            case "A": {
                setCounter(xCounter);
                break;
            }
            case "S": {
                setCounter(yCounter);
                break;
            }
            case "P": {
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
            case "F":
                param = { food: parseInt(itemGoal), water: 0, treat: 0 };
                break;
            case "W":
                param = { food: 0, water: parseInt(itemGoal), treat: 0 };
                break;
            case "T":
                param = { food: 0, water: 0, treat: parseInt(itemGoal) };
                break;
        }

        navigation.navigate({
            name: 'PetHomeScreen',
            params: param,
            merge: true,
        })
    }

    return (
        <View>
            <Text>{activity} --- {item}</Text>

            <Text>Movement:</Text>
            <ProgressBar progress={counter / parseInt(activityGoal)} width={200} height={20} />

            <Text>Item:</Text>
            <ProgressBar progress={(counter / parseInt(activityGoal))} width={200} height={20} />

            <Button
                title="Pause"
                onPress={onActivityDone} />

            <Button
                title="End Activity"
                onPress={onActivityDone} />
        </View>
    )
}

export default ActivityProgress
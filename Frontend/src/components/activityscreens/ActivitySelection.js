import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import { Select } from 'native-base';
import { useNavigation } from '@react-navigation/core'
import { ButtonGroup } from "react-native-elements";
import styles from '../style';
import { Activity } from '../../data/ActivityObject';

const Separator = () => <View style={styles.separator} />;

const ActivitySelection = () => {

    const [selectedActivity, setSelectedActivity] = useState(0);
    const [itemGoal, onItemNumberChange] = useState('0');
    const [activityGoal, onActivityNumberChange] = useState('0');
    const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(1);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);


    const navigation = useNavigation()

    return (
        <View>
            <Separator />
            <Text style={styles.label}>Choose Activity</Text>
            <Select
                selectedValue={selectedActivity}
                onValueChange={(value) => setSelectedActivity(value)}
            >
                <Select.Item label="Select Activity" value="" />
                <Select.Item label={Activity[0].type} value={0} />
                <Select.Item label={Activity[1].type} value={1} />
                <Select.Item label={Activity[2].type} value={2} />
            </Select>

            <Separator />
            <Text style={styles.label}>Choose item to Earn</Text>
            <ButtonGroup
                buttons={['Food', 'Treat', 'Water']}
                selectedIndex={selectedItemIndex}
                onPress={(value) => {
                    setSelectedItemIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

            <Separator />
            <Text style={styles.label}>Difficulty Level</Text>
            <ButtonGroup
                buttons={['Easy', 'Medium', 'Hard']}
                selectedIndex={selectedDifficultyIndex}
                onPress={(value) => {
                    setSelectedDifficultyIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

            <Separator />
            <Text>Earning Goal: </Text>
            <TextInput
                onChangeText={onItemNumberChange}
                value={itemGoal}
                placeholder="0"
                keyboardType="numeric"
            />

            <Separator />
            <Text>Activity Goal: </Text>
            <TextInput
                onChangeText={onActivityNumberChange}
                value={activityGoal}
                placeholder="0"
                keyboardType="numeric"
            />
            
            <Separator />
            <Button
                title="Start"
                onPress={() => {
                    navigation.navigate("ActivityProgressScreen", {
                        activity: selectedActivity,
                        item: selectedItemIndex,
                        activityDifficulty: selectedDifficultyIndex,
                        itemGoal: parseInt(itemGoal) === 0 ? 1 : parseInt(itemGoal),
                        activityGoal: parseInt(activityGoal) === 0 ? 1 : parseInt(activityGoal)
                    })
                }} />

            <Text>{selectedActivity} + " --- " + {selectedItemIndex}</Text>
             
        </View>
    )
}

export default ActivitySelection
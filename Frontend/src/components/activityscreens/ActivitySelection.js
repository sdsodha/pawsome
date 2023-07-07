import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import { Select } from 'native-base';
import { useNavigation } from '@react-navigation/core'

const ActivitySelection = () => {

    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const [itemGoal, onItemNumberChange] = useState('');
    const [activityGoal, onActivityNumberChange] = useState('');


    const navigation = useNavigation()

    return (
        <View>
            <Select
                selectedValue={selectedActivity}
                onValueChange={(value) => setSelectedActivity(value)}
            >
                <Select.Item label="Select Activity" value="" />
                <Select.Item label="Arm Crossover" value="A" />
                <Select.Item label="Shoulder Extensions" value="S" />
                <Select.Item label="Punching Air" value="P" />
            </Select>

            <Select
                selectedValue={selectedItem}
                onValueChange={(value) => setSelectedItem(value)}
            >
                <Select.Item label="Select Item" value="" />
                <Select.Item label="Food" value="F" />
                <Select.Item label="Treat" value="T" />
                <Select.Item label="Water" value="W" />
            </Select>

            <Select
                selectedValue={selectedDifficulty}
                onValueChange={(value) => setSelectedDifficulty(value)}
            >
                <Select.Item label="Select Item" value="" />
                <Select.Item label="Easy" value="E" />
                <Select.Item label="Medium" value="M" />
                <Select.Item label="Hard" value="H" />
            </Select>

            <Text>Earning Goal: </Text>
            <TextInput
                onChangeText={onItemNumberChange}
                value={itemGoal}
                placeholder="0"
                keyboardType="numeric"
            />

            <Text>Activity Goal: </Text>
            <TextInput
                onChangeText={onActivityNumberChange}
                value={activityGoal}
                placeholder="0"
                keyboardType="numeric"
            />

            <Button
                title="Start"
                onPress={() => {
                    navigation.navigate("ActivityProgressScreen", {
                        activity: selectedActivity,
                        item: selectedItem,
                        activityDifficulty: selectedDifficulty,
                        itemGoal: itemGoal,
                        activityGoal: activityGoal
                    })
                }} />

            <Text>{selectedActivity} + " --- " + {selectedItem}</Text>
        </View>
    )
}

export default ActivitySelection
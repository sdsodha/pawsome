import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native'
import { Select } from 'native-base';
import { useNavigation } from '@react-navigation/core'

const ActivitySelection = () => {

    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
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

            <Text>{selectedActivity} + " --- " + {selectedItem}</Text>
            <Button
                title="Start"
                onPress={() => {navigation.navigate("ActivityProgressScreen", {
                    activity: selectedActivity,
                    item: selectedItem
                })}} />
        </View>
    )
}

export default ActivitySelection
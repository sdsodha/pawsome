import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Select } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { ButtonGroup } from 'react-native-elements';
//import styles from '../style';
import { Activity } from '../../data/ActivityObject';
import { Picker } from '@react-native-picker/picker';

const Separator = () => <View style={styles.separator} />;

const ActivitySelection = () => {
  const [selectedActivity, setSelectedActivity] = useState(2);
  const [itemGoal, setItemGoal] = useState(3);
  const [activityGoal, setActivityGoal] = useState(5);
  const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(1);
  const [selectedItemIndex, setSelectedItemIndex] = useState(2);

  const [selectedEarningGoal, setSelectedEarningGoal] = useState(5);
  const [selectedActivityGoal, setSelectedActivityGoal] = useState(10);

  const navigation = useNavigation();

  const updateDifficulty = (selectedValue) => {
    setSelectedDifficultyIndex(selectedValue);
    switch (selectedValue) {
      // Easy
      case 0:
        setSelectedEarningGoal(3);
        setSelectedActivityGoal(5);
        break;
      // Medium
      case 1:
        setSelectedEarningGoal(5);
        setSelectedActivityGoal(10);
        break;
      // Hard
      case 2:
        setSelectedEarningGoal(8);
        setSelectedActivityGoal(15);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.activityPageContainer}>
        <View style={styles.activityContainer}>
          <Text>Choose Activity</Text>
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

        <View style={styles.itemContainer}>
          <Text>Choose item to Earn</Text>
          <ButtonGroup
            buttons={['Food', 'Treat', 'Water']}
            selectedIndex={selectedItemIndex}
            onPress={(value) => {
              setSelectedItemIndex(value);
            }}
            containerStyle={{
              height: 40,
              marginHorizontal: 0,
              backgroundColor: '#F5F5F5',
              padding: 5,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0,
            }}
            selectedButtonStyle={{
              backgroundColor: '#6A5ACD',
              borderRadius: 5,
            }}
            innerBorderStyle={{ width: 0 }}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text>Difficulty Level</Text>
          <ButtonGroup
            buttons={['Easy', 'Medium', 'Hard']}
            selectedIndex={selectedDifficultyIndex}
            onPress={(value) => {
              updateDifficulty(value);
            }}
            containerStyle={{
              height: 40,
              marginHorizontal: 0,
              backgroundColor: '#F5F5F5',
              padding: 5,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0,
            }}
            selectedButtonStyle={{
              backgroundColor: '#6A5ACD',
              borderRadius: 5,
            }}
            innerBorderStyle={{ width: 0 }}
          />
        </View>

        <View style={styles.goalsContainer}>
          <View>
            <Text style={{ marginBottom: 6 }}>Earning Goal</Text>
            <Picker
              itemStyle={{ height: 120 }}
              selectedValue={selectedEarningGoal}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedEarningGoal(itemValue);
                setItemGoal(itemValue);
              }}
            >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="12" value={12} />
              <Picker.Item label="13" value={13} />
              <Picker.Item label="14" value={14} />
              <Picker.Item label="15" value={15} />
              <Picker.Item label="16" value={16} />
              <Picker.Item label="17" value={17} />
              <Picker.Item label="18" value={18} />
              <Picker.Item label="19" value={19} />
              <Picker.Item label="20" value={20} />
            </Picker>
          </View>

          <View>
            <Text style={{ marginBottom: 6 }}>Activity Goal</Text>
            <Picker
              itemStyle={{ height: 120 }}
              selectedValue={selectedActivityGoal}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedActivityGoal(itemValue);
                setActivityGoal(itemValue);
              }}
            >
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="9" value={9} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="11" value={11} />
              <Picker.Item label="12" value={12} />
              <Picker.Item label="13" value={13} />
              <Picker.Item label="14" value={14} />
              <Picker.Item label="15" value={15} />
              <Picker.Item label="16" value={16} />
              <Picker.Item label="17" value={17} />
              <Picker.Item label="18" value={18} />
              <Picker.Item label="19" value={19} />
              <Picker.Item label="20" value={20} />
            </Picker>
          </View>
        </View>

        <View style={styles.startActivityButtonContainer}>
          <TouchableOpacity
            style={styles.startActivityButton}
            onPress={() => {
              navigation.navigate('ActivityProgressScreen', {
                activity: selectedActivity,
                item: selectedItemIndex,
                activityDifficulty: selectedDifficultyIndex,
                itemGoal: parseInt(itemGoal) === 0 ? 1 : parseInt(itemGoal),
                activityGoal:
                  parseInt(activityGoal) === 0 ? 1 : parseInt(activityGoal),
              });
            }}
          >
            <Text style={{ color: 'white' }}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActivitySelection;

const styles = StyleSheet.create({
  activitySelectionContainer: {
    marginTop: 10,
    width: 320,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    backgroundColor: 'white',
  },
  activityContainer: {
    marginBottom: 15,
  },
  activityPageContainer: {
    gap: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 5,
    width: 320,
  },
  startActivityButtonContainer: {
    marginTop: 15,
    width: 320,
    borderRadius: 8,
    backgroundColor: '#37298A',
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  goalsContainer: {
    flexDirection: 'row',
    gap: 80,


  },
});

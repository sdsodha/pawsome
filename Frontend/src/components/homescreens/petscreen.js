import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
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
import { Accelerometer } from 'expo-sensors';


const PetComponent = ({ route, navigation }) => {

  //Anim vars
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const { food, water, treat } = route.params;

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

  const [mood, setMood] = useState(20);
  const [health, setHealth] = useState(20);
  const [textInputValue, setTextInputValue] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [petFormData, setPetFormData] = useState(null);

  const [moodProgress, setMoodProgress] = useState(0.5);
  const [healthProgress, setHealthProgress] = useState(0.5);

  const [modalVisible, setModalVisible] = useState(false);

  const [foodCount, setFood] = useState(food);
  const [waterCount, setWater] = useState(water);
  const [treatCount, setTreat] = useState(treat);

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

  const onFoodPress = () => {
    if (foodCount <= 0) {
      setModalVisible(!modalVisible);
      return;
    }

    setFood(foodCount - 1);
    video.current.loadAsync(require("../../../assets/sampleVideos/love.mp4"))
      .then(() => {
        video.current.playAsync();

        handleHealthProgress(1, 0, 0);
        handleMoodProgress(1, 0, 0);
      })
  }

  const onWaterPress = () => {
    if (waterCount <= 0) {
      setModalVisible(!modalVisible);
      return;
    }

    setWater(waterCount - 1);
    video.current.loadAsync(require("../../../assets/sampleVideos/cheers.mp4"))
      .then(() => {
        video.current.playAsync();

        handleHealthProgress(0, 1, 0);
        handleMoodProgress(0, 1, 0);
      })
  }

  const onTreatPress = () => {
    if (treatCount <= 0) {
      setModalVisible(!modalVisible);
      return;
    }

    setTreat(treatCount - 1);
    video.current.loadAsync(require("../../../assets/sampleVideos/angry.mp4"))
      .then(() => {
        video.current.playAsync();

        handleHealthProgress(0, 0, 1);
        handleMoodProgress(0, 0, 1);
      })
  }

  return (
    <View style={styles.container}>
      {/* 
      <Text>X movement : {xCounter}</Text>
      <Text>Y movement : {yCounter}</Text>
      <Text>Z movement : {zCounter}</Text>
       */}

      <Video
        ref={video}
        style={styles.video}
        source={
          //uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          require("../../../assets/sampleVideos/cheers.mp4")
        }
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      {/* 
      <View style={styles.button}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> 
      */}

      <View style={styles.button}>
        <Button
          title={"Food - " + foodCount}
          onPress={onFoodPress}
        />
        <Button
          title={"Water - " + waterCount}
          onPress={onWaterPress}
        />
        <Button
          title={"Treat - " + treatCount}
          onPress={onTreatPress}
        />
      </View>

      <Text style={styles.label}>Mood:</Text>
      <ProgressBar progress={moodProgress} width={200} height={20} />

      <Text style={styles.label}>Health:</Text>
      <ProgressBar progress={healthProgress} width={200} height={20} />

      <View style={{ marginTop: 50 }}>
        <Button
          title="Start Activity"
          onPress={() => { navigation.navigate("ActivitySelectionScreen") }} />
      </View>

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
              <Image
                style={styles.image}
                source={require("../../../assets/picture1.jpg")}
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

      <Text> Params - {food} {water} {treat}</Text>

    </View>
  );
};

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

export default PetComponent;

// <ProgressBarAndroid
//         styleAttr="Horizontal"
//         indeterminate={false}
//         progress={mood}
//         color="#ffcc00"
//       />

//https://medium.com/@jujunsetiawan10/how-to-create-progress-bar-in-react-native-f27ae2871ac3

import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Video, ResizeMode } from 'expo-av';
import * as Progress from 'react-native-progress';
import { Activity } from '../../data/ActivityObject';
import Icon from 'react-native-vector-icons/FontAwesome';

const ActivityProgress = ({ route, navigation }) => {
  const { activity, item, activityDifficulty, itemGoal, activityGoal } = route.params;

  // const activity = 1;
  // const item = 'Food';
  // const activityDifficulty = 'Easy';
  // const itemGoal = 3;
  // const activityGoal = 5;

  const [showModal, setShowModal] = useState(false);


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

  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisible1, setModalVisible1] = useState(false);

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
    console.log('Activity Count - ', counter);
  };

  //Sensor code
  const _slow = () => Accelerometer.setUpdateInterval(500);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
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
    if (xMove === true && x <= -1) {
      setXCounter(xCounter + 1);
      setXMove(false);
      console.log('X count - ', xCounter);
      updateCount();
    }

    if (y >= 1) {
      setYMove(true);
    }
    if (yMove === true && y <= -1) {
      setYCounter(yCounter + 1);
      setYMove(false);
      console.log('Y count - ', yCounter);
      updateCount();
    }

    if (z >= 1) {
      setZMove(true);
    }
    if (zMove === true && z <= -1) {
      setZCounter(zCounter + 1);
      setZMove(false);
      console.log('Z count - ', zCounter);
      updateCount();
    }

    if (counter === parseInt(activityGoal)) {
      setShowModal(true);
    }
  };

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
    });
  };

  const onViewInstructions = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.activityText}>Activity in Progress</Text>

        <TouchableOpacity
          style={styles.viewInstructionButton}
          onPress={onViewInstructions}
        >
          <Text style={{ color: '#6A5ACD' }} fontSize={12}>
            Instructions
          </Text>
        </TouchableOpacity>

        <Progress.Circle
          style={styles.progressCircle}
          progress={counter / parseInt(activityGoal)}
          color="#CD4668"
          strokeCap="round"
          thickness={40}
          size={300}
          showsText={true}
        />

        <View style={styles.centeredView}>

          <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            transparent
            animationType="fade"
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{
                  marginVertical: 20,
                  fontWeight: '500',
                }}>Activity Finished</Text>

                <Image
                  resizeMode='contain'
                  source={require('../../../assets/activityIcons/okayButton.png')}
                  style={{ width: 80, height: 80, marginVertical: 20 }}
                />

                <View style={styles.rowContainer}>
                  <View style={styles.rowContentContainer}>
                    <Image
                      source={require('../../../assets/move.png')}
                      style={styles.rowImage}
                    />
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Movements</Text>
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>{activityGoal}</Text>
                  </View>
                  <View style={styles.rowContentContainer}>
                    <Image
                      source={require('../../../assets/goal.png')}
                      style={styles.rowImage}
                    />
                    <Text>Item Earned</Text>
                    <Text>{itemGoal}</Text>
                  </View>
                </View>
                <View style={styles.instructionButtonContainer}>
                  <TouchableOpacity
                    style={styles.instructionButton}
                    onPress={onActivityDone}
                  >
                    <Text style={{ color: 'white' }}>Home</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.activityButtonContainer}>
          <TouchableOpacity style={styles.pauseButton} onPress={onActivityDone}>
            <Text style={{ color: 'white' }}>Pause</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityButtonContainer}>
          <TouchableOpacity
            style={styles.endActivityButton}
            onPress={onActivityDone}
          >
            <Text style={{ color: 'black' }}>End Activity</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusMainContainer}>
          <Text style={{ fontSize: 18 }}>Status</Text>

          <View style={styles.statusInnerContainer}>
            <Text style={{ marginBottom: 5 }}>Movements</Text>
            <Progress.Bar
              progress={counter / parseInt(activityGoal)}
              width={320}
              height={15}
              borderWidth={0}
              borderRadius={10}
              unfilledColor="#A298DD"
              color="#6A5ACD"
            />
          </View>

          <View style={styles.statusInnerContainer}>
            <Text style={{ marginBottom: 5 }}>Item Gained</Text>
            <Progress.Bar
              progress={counter / parseInt(activityGoal)}
              width={320}
              height={15}
              borderWidth={0}
              borderRadius={10}
              unfilledColor="#A298DD"
              color="#6A5ACD"
            />
          </View>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
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
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />

                <View style={{
                  marginVertical: 10,
                  gap: 8,
                }}>
                  <Text style={{ fontWeight: '500' }}>Instructions </Text>
                  <Text>{Activity[activity].instructionText} </Text>
                </View>

                <View style={styles.instructionButtonContainer}>
                  <TouchableOpacity
                    style={styles.instructionButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={{ color: 'white' }}>Continue</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 80,
  },
  modalButtonContainer: {
    marginTop: 10,
    width: 320,
    borderRadius: 8,
    backgroundColor: '#37298A',
  },
  rowImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    marginTop: 8,
  },
  modalButton: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  rowPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'centre',
    marginBottom: 20,
    gap: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'centre',
    marginBottom: 20,
    gap: 50,
  },
  rowContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  statusMainContainer: {
    marginTop: 20,
  },
  statusInnerContainer: {
    marginTop: 20,
    backgroundColor: '#F6F5F5',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  activityButtonContainer: {
    marginTop: 30,
    width: 320,
    borderRadius: 8,
    backgroundColor: '#37298A',
  },
  pauseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    fontSize: 18,
    width: 320,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  endActivityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 18,
    width: 320,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#6A5ACD',
    padding: 10,
    marginBottom: 4,
  },
  progressCircle: {
    marginTop: 10,
    marginBottom: 50,
  },
  activityText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  viewInstructionButton: {
    marginBottom: 20,
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
    padding: 10,
  },
  video: {
    alignSelf: 'center',
    width: 281,
    height: 158,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    //backgroundColor: '#00000010',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 330,
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
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: '500'
  },
  instructionButtonContainer: {
    marginTop: 20,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#37298A',
    marginBottom: 10,
  },
  instructionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    fontSize: 18,
    width: 120,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
});

export default ActivityProgress;

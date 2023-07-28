import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../config/firebase';
//import styles from '../style';
import { Pets } from '../../data/PetObject';
import { ButtonGroup } from 'react-native-elements';
import Carousel from 'react-native-reanimated-carousel';

const PetSelectScreen = () => {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [selectedPet, setSelectedPet] = useState(0);
  const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);

  const [currentUserId, setCurrentUserId] = useState('');

  const width = Dimensions.get('window').width;

  const ref = React.useRef(null);
  //   const purpleColor = '#37298A';

  const [images, setImages] = React.useState([
    Pets[0].imageSrc,
    Pets[1].imageSrc,
    Pets[2].imageSrc,
  ]);

  const imageData = [Pets[0].imageSrc, Pets[1].imageSrc, Pets[2].imageSrc];

  useEffect(() => {
    //fetchCurrentUserId();
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
          console.log('User Found', foundUser._id);
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

    /*
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
        */

    navigation.navigate('Home', { selectedPet: selectedPet, petName: name });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <View style={styles.container}>
          <View style={styles.difficultyContainer}>
            <Text>Difficulty Level</Text>
            <ButtonGroup
              buttons={['Easy', 'Medium', 'Hard']}
              selectedIndex={selectedDifficultyIndex}
              onPress={(value) => {
                setSelectedDifficultyIndex(value);
              }}
              containerStyle={{
                height: 40,
                marginHorizontal: 0,
                backgroundColor: '#F5F5F5',
                padding: 5,
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

          <View style={styles.petContainer}>
            <Text>Choose Pet</Text>

            <View style={styles.imageContainer}>
              <View>
                <TouchableOpacity
                  style={[styles.detailButton]}
                  onPress={() => {
                    ref.current?.scrollTo({ count: -1, animated: true });
                  }}
                >
                  <Text style={styles.buttonText}>{'<'}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 250,
                  height: 250,
                }}
              >
                <Carousel
                  loop
                  width={280}
                  height={300}
                  data={images}
                  pagingEnabled={true}
                  ref={ref}
                  scrollAnimationDuration={800}
                  onSnapToItem={(index) => setSelectedPet(index)}
                  renderItem={({ item, index }) => (
                    <Image
                      style={{
                        width: '100%',
                        height: '80%',
                        resizeMode: 'contain',
                      }}
                      source={item}
                    />
                  )}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.detailButton]}
                  onPress={() => {
                    ref.current?.scrollTo({ count: 1, animated: true });
                  }}
                >
                  <Text style={styles.buttonText}>{'>'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {Array(3)
                .fill({})
                .map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        opacity: index === selectedPet ? 0.8 : 0.4,
                        fontSize: 32,
                      }}
                    >
                      •
                    </Text>
                  );
                })}
            </View>
          </View>

          <View style={styles.labelContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.label}>Name: </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>

          <View style={styles.startActivityButtonContainer}>
            <TouchableOpacity
              style={styles.startActivityButton}
              onPress={() => handleSubmit(currentUserId)}
            >
              <Text style={{ color: 'white' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default PetSelectScreen;

const styles = StyleSheet.create({
  difficultyContainer: {
    width: 300,
    gap: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    resizeMode: 'contain',
  },

  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: "100%",
  },
  nameContainer: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: 'black', // Border color (you can customize this)
  },
  label: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginRight: 10, // Add spacing between the label and input
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
  },
  startActivityButtonContainer: {
    marginTop: 35,
    width: 150,
    borderRadius: 8,
    backgroundColor: '#37298A',
  },
  startActivityButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    fontSize: 18,
    width: 150,
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
    height: 720,
  },
  petContainer: {
    width: 300,
    marginTop: 10,
  },
  buttonText: {
    color: '#37298A',
    fontSize: 36,

    textAlign: 'center',
  },
});

//  Shishupals Image Slider, Cause ViewProps Errors but perfect feature wise

{
  /* <View style={styles.container}>
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
                        </View> */
}

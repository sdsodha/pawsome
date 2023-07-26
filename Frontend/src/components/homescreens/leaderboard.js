import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { auth } from '../../config/firebase';
import axios from 'axios';
import { BACKEND_API } from '../../config/backendlink';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { BlurView } from '@react-native-community/blur';

const purpleColor = '#37298A';
const greyColor = '#CEC9EE';

const Leaderboard = () => {
  const navigation = useNavigation();

  //-----------Variable for switch between 2 tabs---------------------
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //--------------Tab 1 Search Functionality-------------------

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [moodProgress, setMoodProgress] = useState(0.3);
  const [healthProgress, setHealthProgress] = useState(0.8);

  useEffect(() => {
    fetchCurrentUserId();
    fetchUsers();
  }, []);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  //--------------------Tab 2 Search Functionality--------------------------------
  const [searchQuery2, setSearchQuery2] = useState('');

  //---------------------------------------------------------------

  const [apiSuccess, setApiSuccess] = useState(false);

  //--------------------Sign Out Functionality--------------------------------

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  //----------------------Get object user ID of logged in user-----------------------//

  const [currentUserId, setCurrentUserId] = useState('');

  const fetchCurrentUserId = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const response = await fetch(`${BACKEND_API}/users`);
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

  // --------------------Fetch all users from the backend----------------------//
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/users`);
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  //---------------------------------Display all users in Public section-----------------

  const renderUserItem = ({ item, index }) => {
    const handleUserPress = () => {
      setSelectedUser(item);
      setModalVisible(true);
    };

    const isEmailMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!isEmailMatch) {
      return null;
    }

    return (
      <View style={[styles.listItem, index % 2 !== 1 && styles.listItemOdd]}>
        <Text style={styles.number}>{index + 1}.</Text>
        <Image
          // source={{ uri: 'https://picsum.photos/536/354' }}
          source={require('../../../assets/userimages/karan.png')}
          // source={require(`../../../assets/userimages/${item.imageUrl}.png`)}
          style={styles.profileImage}
        />

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.score}>Scores - {item.scores}</Text>
        </View>

        <TouchableOpacity
          style={[styles.detailButton]}
          onPress={handleUserPress}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSearch = () => {
    const filteredResults = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredUsers(filteredResults);
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  //------------------------------------Add friend functionality---------------------------------

  const handleAddFriend = async (selectedUser) => {
    try {
      const response = await fetch(`${BACKEND_API}/user-lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registeredUsers: [selectedUser],
          user: currentUserId,
        }),
      });

      if (response.status === 200) {
        // alert('User added as a friend successfully');

        setSelectedUser(null);
        setApiSuccess((prev) => !prev);
        setModalVisible(false);
        setShowModal(true);
      } else {
        console.error('Failed to add user as a friend');
      }
    } catch (error) {
      console.error('An error occurred while adding user as a friend:', error);
    }
  };

  //-------------------Display the freinds in friends section--------------------------------------
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API}/user-lists/${currentUserId}`,
        );
        const data = await response.json();
        const { userList } = data;
        if (userList) {
          setRegisteredUsers(userList.registeredUsers);
        }
      } catch (error) {
        console.error('An error occurred while fetching the user list:', error);
      }
    };

    fetchUserList(currentUserId);
  }, [currentUserId, apiSuccess]);

  //-----------------------Remove friend from the friend list for single user-------------------------------

  const handleRemoveFriend = async (selectedUser) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API}/userlist/${currentUserId}/registeredUsers/${selectedUser._id}`,
      );

      if (response.status === 200) {
        console.log('User removed as a friend successfully');
        // alert('User removed as a friend successfully');
        setSelectedUser(null);
        setApiSuccess((prev) => !prev);
        setModalVisible(false);
        setShowModal(true);
      } else {
        console.error('Failed to remove user as a friend');
      }
    } catch (error) {
      console.error(
        'An error occurred while removing user as a friend:',
        error,
      );
    }
  };

  //----------------------------------------------OUTPUT OF BOTH TABS----------------------------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 1 && styles.activeTab]}
          onPress={() => handleTabPress(1)}
        >
          <Text
            style={[styles.tabText, activeTab === 1 && styles.activeTabText]}
          >
            Public
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 2 && styles.activeTab]}
          onPress={() => handleTabPress(2)}
        >
          <Text
            style={[styles.tabText, activeTab === 2 && styles.activeTabText]}
          >
            Friends
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 1 && (
          <View>
            <View>
              <Icon style={styles.searchContainer} name="search" size={20} />

              <TextInput
                style={styles.searchInput}
                placeholder="       Search for friends..."
                value={searchQuery}
                onChangeText={handleSearchQueryChange}
              />
            </View>

            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />

            {modalVisible && <View style={styles.overlay} />} 
            {showModal && <View style={styles.overlay} />} 

            <Modal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              transparent="true"
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {selectedUser && (
                    <View style={styles.userDetailsContainer}>
                      <Text style={styles.userDetails}>
                        {selectedUser.name}
                      </Text>

                      <Text style={styles.userDetails}>
                        Scores - {selectedUser.scores}
                      </Text>
                      <Image
                        // source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                        // source={require(`../../../assets/userimages/${selectedUser.imageUrl}.png`)}
                        source={require('../../../assets/userimages/karan.png')}
                        style={styles.profileBigImage}
                      />
                      <Text> </Text>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                          style={[styles.modalButton]}
                          onPress={() => handleAddFriend(selectedUser)}
                        >
                          <Text style={{ color: 'white' }}>{'Add Friend'}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                          style={[styles.modalButton]}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={{ color: 'white' }}>{'Close Tab'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Modal>

            <Modal
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
              transparent
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Icon name="check" size={60} color="green" />
                  <Text style={styles.userDetails}>
                    User added as a friend successfully
                  </Text>
                  <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text>OK</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {activeTab === 2 && (
          <View>
            <View>
              <Icon
                style={styles.searchContainer}
                name="search"
                size={20}
                color="black"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="       Search for friends..."
                value={searchQuery2}
                onChangeText={(text) => setSearchQuery2(text)}
              />
            </View>
            {registeredUsers
              .filter((user) => user.email.includes(searchQuery2))
              .map((user, index) => (
                <View
                  style={[
                    styles.listItem,
                    index % 2 !== 1 && styles.listItemOdd,
                  ]}
                  key={user._id}
                >
                  <Text style={styles.number}>{index + 1}.</Text>

                  <Image
                    // source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                    // source={require(`../../../assets/userimages/${user.imageUrl}.png`)}
                    //  source={require(`../../../assets/${user.imageFileName}`)}
                    // source={{ uri: user.imageUrl }}
                    source={require('../../../assets/userimages/karan.png')}
                    style={styles.profileImage}
                  />

                  <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.score}>Scores - {user.scores}</Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.detailButton]}
                    onPress={() => handleUserPress(user)}
                  >
                    <Text style={styles.buttonText}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {modalVisible && <View style={styles.overlay} />} 
              {showModal && <View style={styles.overlay} />} 

            <Modal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              transparent
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {selectedUser && (
                    <View style={styles.userDetailsContainer}>
                      <Text style={styles.userDetails}>
                        {selectedUser.name}
                      </Text>

                      <Image
                        // source={require('../../../assets/owl.png')}
                        // source={require(`../../../assets/userimages/${selectedUser.imageUrl}.png`)}
                        // source={require('./pet2image.JPG')}
                        source={require('../../../assets/userimages/karan.png')}
                        style={styles.profileBigImage}
                      />
                      <Text style={styles.rankDetails}> #3 </Text>
                      <View style={styles.modelBars}>
                        <Text style={styles.label}>Pet's Mood:</Text>
                        <ProgressBar
                          progress={moodProgress}
                          width={320}
                          height={15}
                          borderWidth={0}
                          borderRadius={10}
                          unfilledColor="#A298DD"
                          color="#6A5ACD"
                        />

                        <Text style={styles.label}>Pet's Health:</Text>
                        <ProgressBar
                          progress={healthProgress}
                          width={320}
                          height={15}
                          borderWidth={0}
                          borderRadius={10}
                          unfilledColor="#A298DD"
                          color="#6A5ACD"
                        />
                        <Text></Text>
                      </View>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                          style={[styles.modalButton]}
                          onPress={() => handleRemoveFriend(selectedUser)}
                        >
                          <Text style={{ color: 'white' }}>
                            {'Remove Friend'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                          style={[styles.modalButton]}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={{ color: 'white' }}>{'Close Tab'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Modal>

            <Modal
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
              transparent
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Icon name="check" size={60} color="green" />
                  <Text style={styles.userDetails}>
                    User removed as a friend successfully
                  </Text>
                  <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text>OK</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

//--------------------------Design---------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalButtonContainer: {
    marginTop: 10,
    width: 320,
    borderRadius: 8,
    backgroundColor: '#37298A',
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
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor: '#F2F2F2',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 6,
    borderBottomColor: greyColor,
  },
  activeTab: {
    borderBottomWidth: 6,
    borderBottomColor: purpleColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: greyColor,
  },
  activeTabText: {
    color: purpleColor,
  },
  contentContainer: {
    flex: 1,
    // padding: 10,
  },
  listContainer: {
    // padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  number: {
    fontSize: 16,
    marginRight: 10,
  },
  itemContentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  modelBars: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: purpleColor,
  },
  score: {
    fontSize: 16,
    color: purpleColor,
  },
  userDetailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: purpleColor,
  },
  rankDetails: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  profileBigImage: {
    width: 170,
    height: 170,
    borderRadius: 45,
    resizeMode: 'contain',
  },

  searchContainer: {
    position: 'absolute', // Position the icon absolutely
    left: 25, // Adjust the left position of the icon

    bottom: 18,
    zIndex: 1, // Make sure the icon stays above the TextInput
    color: purpleColor,
  },

  searchInput: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  userInfoContainer: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButton: {
    position: 'absolute',
    top: 4, // Adjust this value to control the vertical position from the bottom
    right: 10, // Adjust this value to control the horizontal position from the right
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: purpleColor,
    fontSize: 28,

    textAlign: 'center',
  },
  cardButtonText: {
    color: 'white',
    backgroundColor: purpleColor,
    fontSize: 20,
    paddingVertical: 6, // Add top and bottom padding here
    paddingHorizontal: 64, // Add left and right padding here
    textAlign: 'center',
  },
  listItemOdd: {
    backgroundColor: greyColor,
    width: '100%', // Grey background color for odd-numbered items
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
  },
});

export default Leaderboard;

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


const Leaderboard = () => {
  const navigation = useNavigation();

  //-----------Variable for switch between 2 tabs---------------------
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

    const isEmailMatch = item.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!isEmailMatch) {
      return null;
    }

    return (
      <View style={styles.listItem}>
        <Text style={styles.number}>{index + 1}.</Text>
        <Image
          source={{ uri: 'https://picsum.photos/536/354' }}
          style={styles.profileImage}
        />

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{item.email}</Text>
          <Text style={styles.score}>Scores - 20 {item.score}</Text>
        </View>
        <Button title={'View Details'} onPress={handleUserPress} />
      </View>
    );
  };

  const handleSearch = () => {
    const filteredResults = users.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
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
        alert('User added as a friend successfully');
        setSelectedUser(null);
        setApiSuccess((prev) => !prev);
        setModalVisible(false);
        
       
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
        alert('User removed as a friend successfully');
        setSelectedUser(null);
        setApiSuccess((prev) => !prev);
        setModalVisible(false);
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
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearchQueryChange}
              />
            </View>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />
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
                        {selectedUser.email}
                      </Text>
                      <Text style={styles.userDetails}>{selectedUser._id}</Text>
                      <Text style={styles.userDetails}>
                        Scores - 20 {selectedUser.score}
                      </Text>
                      <Image
                        source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                        // source={require('./petimage.JPG')}
                        style={styles.profileBigImage}
                      />
                      <Text> </Text>
                      <View style={styles.modalButton}>
                      <Button
                        title="Add Friend"
                        onPress={() => handleAddFriend(selectedUser)}
                      />
                      <Button
                        title="Close Tab"
                        onPress={() => setModalVisible(false)}
                      />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        )}

        {activeTab === 2 && (
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery2}
              onChangeText={(text) => setSearchQuery2(text)}
            />
            {registeredUsers
              .filter((user) => user.email.includes(searchQuery2))
              .map((user, index) => (
                <View style={styles.listItem} key={user._id}>
                  <Text style={styles.number}>{index + 1}.</Text>
                  
                  <Image
                    source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                    style={styles.profileImage}
                  />

                  <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>{user.email}</Text>
                    <Text style={styles.score}>Scores - 20 {user.score}</Text>
                  </View>
                  <View style={styles.itemContentContainer}>
                  <Button
                    title={'View Details'}
                    onPress={() => handleUserPress(user)}
                  />
                  </View>
                </View>
              ))}

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
                        {selectedUser.email}
                      </Text>
                   
                     
                      <Image
                      source={{ uri: 'https://picsum.photos/536/354' }}
                      // source={require('./pet2image.JPG')} 
                        style={styles.profileBigImage}
                      />
                      <Text style={styles.rankDetails}> #3 </Text>
                      <View style={styles.modelBars}>
                      <Text style={styles.label}>Pet's Mood:</Text>
      <ProgressBar progress={moodProgress} width={200} height={20} />

      <Text style={styles.label}>Pet's Health:</Text>
      <ProgressBar progress={healthProgress} width={200} height={20} />
      <Text></Text>
      </View>
      <View style={styles.modalButton}>
                      <Button 
                        title="Remove Friend"
                        onPress={() => handleRemoveFriend(selectedUser)}
                      />
                      <Button 
                        title="Close Tab"
                        onPress={() => setModalVisible(false)}
                      />
                      </View>
                    </View>
                  )}
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
  },
  modalButton: {
   borderRadius: 5,
   gap: 5, 
   marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  activeTabText: {
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  },
  userDetailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  profileBigImage: {
    width: 170,
    height: 170,
    borderRadius: 45,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  searchButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    marginBottom: 10,
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
  },
});

export default Leaderboard;

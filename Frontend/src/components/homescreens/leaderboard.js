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
} from 'react-native';
import { auth } from '../../config/firebase';
import axios from 'axios';

const Leaderboard = () => {
  const navigation = useNavigation();

  //-----------Variable for switch between 2 tabs---------------------
  const [activeTab, setActiveTab] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  //--------------Tab 1 Search Functionality-------------------

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  useEffect(() => {
    fetchCurrentUserId();
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
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
  };

  //------------------------------------Add friend functionality---------------------------------

  const handleAddFriend = async (selectedUser) => {
    try {
      const response = await fetch('http://localhost:8080/user-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registeredUsers: [selectedUser],
          user: currentUserId,
        }),
      });

      if (response.ok) {
        alert('User added as a friend successfully');
        Alert('User added as a friend successfully');
        console.log('User added as a friend successfully');
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
          `http://localhost:8080/user-lists/${currentUserId}`,
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
        `http://localhost:8080/userlist/${currentUserId}/registeredUsers/${selectedUser._id}`,
      );

      if (response.status === 200) {
        console.log('User removed as a friend successfully');
        alert('User removed as a friend successfully');
        setSelectedUser(null);
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

            {selectedUser && (
              <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetails}>{selectedUser.email}</Text>
                <Text style={styles.userDetails}>{selectedUser._id}</Text>
                <Text style={styles.userDetails}>Scores - 20 {selectedUser.score}</Text>
                <Image
                  source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                  style={styles.profileBigImage}
                />
                <Text> </Text>
                <Button
                  title="Add Friend"
                  onPress={() => handleAddFriend(selectedUser)}
                />
              </View>
            )}
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
                  <Button
                    title={'View Details'}
                    onPress={() => handleUserPress(user)}
                  />
                </View>
              ))}
            {selectedUser && (
              <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetails}>{selectedUser.email}</Text>
                <Text style={styles.userDetails}>{selectedUser._id}</Text>
                <Text style={styles.userDetails}>Scores - 20 {selectedUser.score}</Text>
                <Image
                  source={{ uri: 'https://picsum.photos/536/354' }} // Replace with the actual image URL
                  style={styles.profileBigImage}
                />
                <Text> </Text>
                <Button
                  title="Remove Friend"
                  onPress={() => handleRemoveFriend(selectedUser)}
                />
              </View>
            )}
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  profileBigImage: {
    width: 70,
    height: 70,
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
});

export default Leaderboard;

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
} from 'react-native';
import { auth } from '../../config/firebase';
import axios from 'axios';

const Leaderboard = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

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

  //----------------------Get logged in user ID-----------------------//

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

  // --------------------Fetch all users from the backend
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  //--------------------------------------------------

  const renderUserItem = ({ item, index }) => {
    const handleUserPress = () => {
      setSelectedUser(item);
    };

    return (
      <View style={styles.listItem}>
        <Text style={styles.number}>{index + 1}</Text>
        <Text style={styles.userName}>{item.email}</Text>
        <Button title={'View Details'} onPress={handleUserPress} />
      </View>
    );
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
  };

  //-----------------------------------------------------

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
        // alert('User added as a friend successfully');
        Alert('User added as a friend successfully');
        console.log('User added as a friend successfully');

        // Optionally, you can update the user list on the client-side as well
      } else {
        console.error('Failed to add user as a friend');
      }
    } catch (error) {
      console.error('An error occurred while adding user as a friend:', error);
    }
  };

  //-------------------Display the registered users--------------------------------------
  const [registeredUsers, setRegisteredUsers] = useState([]);

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

  useEffect(() => {
    fetchUserList(currentUserId);
  }, [currentUserId]);
  //------------------------------------------------------------------------------------

  //-----------------------Remove friend from the friend list for single user-------------------------------
  
    const handleRemoveFriend = async (selectedUser) => {
      try {
        const response = await axios.delete(
          `http://localhost:8080/userlist/${currentUserId}/registeredUsers/${selectedUser._id}`,
        );
  
        if (response.status === 200) {
          console.log('User removed as a friend successfully');
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
  
  

  

  //-------------------------------------------------------------------------OUTPUT----------------------------------------------------------

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
            <Text>All users</Text>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <FlatList
              data={users}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />

            {selectedUser && (
              <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetails}>{selectedUser.email}</Text>
                <Text style={styles.userDetails}>{selectedUser._id}</Text>

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
            <Text>My Friends</Text>
            <View>
              
              {registeredUsers.map((user) => (
                <View style={styles.listItem} key={user._id}>
                  <Text style={styles.number}>{user.email}</Text>
                  <Button
                    title={'View Details'}
                    onPress={() => handleUserPress(user)}
                  />
                </View>
              ))}
            </View>
            {selectedUser && (
              <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetails}>{selectedUser.email}</Text>
                <Text style={styles.userDetails}>{selectedUser._id}</Text>
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
});

export default Leaderboard;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import axios from 'axios';

const UserListComponent = () => {
  const navigation = useNavigation();
  const [userLists, setUserLists] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  const [users, setUsers] = useState("");
  const [currentUserId, setCurrentUserId] = useState('');

  // ---------------------------------------------------------------------------------------------------------

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
//-----------------------------------------------------------------------------------------------




  useEffect(() => {
    const fetchUserLists = async (currentUserId) => {
      try {
        // Make a GET request to the backend API to fetch the user lists data
        const response = await axios.get(
          `http://localhost:8080/user-lists/${currentUserId}`,
        );
        setUserLists(response.data.userList.registeredUsers);
        console.log(response.data.userList);
      } catch (error) {
        console.error('Error fetching user list data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      return <div>Loading user lists...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    if (currentUserId) {
      fetchUserLists(currentUserId);
    }
  }, [currentUserId]);

  // ---------------------------------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/users');
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [friendEmails, setFriendEmails] = useState('');

  const handleAddFriends = async (currentUserId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-lists/${currentUserId}`
      );
      const existingRegisteredUsers = response.data.userList.registeredUsers;
      const newRegisteredUsers = [
        ...existingRegisteredUsers,
        ...friendEmails.split(',').map(email => ({ email })),
      ];
      const newResponse = await axios.post(
        'http://localhost:8080/user-lists',
        {
          registeredUsers: newRegisteredUsers,
          user: currentUserId,
        }
      );
      console.log(newResponse.data.message);
      // fetchUserLists(); // Refresh user lists after adding friends
      setFriendEmails(''); // Clear friend emails input
    } catch (error) {
      console.error('Error adding friends:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Your other JSX components */}
      <Text>Welcome to the Users Leaderboard</Text>
      <Button
        title="Go to Pet Form"
        onPress={() => navigation.navigate('PetForm')}
      />
      <Button
        title="Go to Pet Screen"
        onPress={() => navigation.navigate('PetComponent')}
      />
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
      <TextInput
        placeholder="Enter username of your friend"
        value={friendEmails}
        onChangeText={(text) => setFriendEmails(text)}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
      />
      <Button title="Add User" onPress={() => handleAddFriends(currentUserId)} />

      <Text>Registered Users of this user</Text>
   

      <div>
      <h1>User Lists</h1>
      {userLists.length > 0 ? (
        <ul>
          {userLists.map((user) => (
            <li key={user._id}>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user lists found</p>
      )}
    </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 16,
  },
});

export default UserListComponent;


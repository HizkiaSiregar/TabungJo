import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RestAPI = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data));
  }, []);
  return (
    <View>
      <Text>RestAPI</Text>
      {users.map(item => (
        <Text style={{fontSize: 20}}>{item.name}</Text>
      ))}
    </View>
  );
};

export default RestAPI;

const styles = StyleSheet.create({});

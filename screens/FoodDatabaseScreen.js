// FoodDatabaseScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FoodDatabaseScreen = () => {
  const [searchFood, setSearchFood] = useState('');

  const handleSearch = () => {
    console.log('Searched Food:', searchFood); // Remove it after, just for debug purpose
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Healthy Choices</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchFood}
          onChangeText={setSearchFood}
          placeholder="Enter food name"
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    paddingHorizontal: 10,
  },
});

export default FoodDatabaseScreen;

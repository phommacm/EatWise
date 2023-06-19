// FoodDatabaseScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const FoodDatabaseScreen = () => {
  const [searchFood, setSearchFood] = useState('');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (searchFood.trim() !== '') {
      fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(
          searchFood
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': '2823a001',
            'x-app-key': '9a885b87dafa9a9a62e4c74062bd4991',
          },
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log('Search Results:', data);
          if (data.common && data.common.length > 0) {
            const commonFood = data.common[0];
            const foodName = commonFood.food_name;
            const image = commonFood.photo.thumb;

            fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-app-id': '2823a001',
                'x-app-key': '9a885b87dafa9a9a62e4c74062bd4991',
              },
              body: JSON.stringify({
                query: foodName,
              }),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Nutrition Data:', data);
                if (data.foods && data.foods.length > 0) {
                  const food = data.foods[0];
                  setFoodName(food.food_name);
                  setCalories(food.nf_calories || '');
                  setError('');
                } else {
                  setFoodName('');
                  setCalories('');
                  setError('Food not found');
                }
              })
              .catch(error => {
                console.log('Error fetching nutrition data:', error);
                setFoodName('');
                setCalories('');
                setError('Error fetching nutrition data. Please try again.');
              });

            setImage(image);
          } else {
            setFoodName('');
            setCalories('');
            setImage('');
            setError('Food not found');
          }
        })
        .catch(error => {
          console.log('Error fetching search data:', error);
          setFoodName('');
          setCalories('');
          setImage('');
          setError('Error fetching search data. Please try again.');
        });
    }
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
      {foodName !== '' && (
        <View style={styles.resultContainer}>
          {image !== '' && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <Text style={styles.resultLabel}>Food Name:</Text>
          <Text style={styles.resultText}>{foodName}</Text>
          {calories !== '' && (
            <>
              <Text style={styles.resultLabel}>Calories:</Text>
              <Text style={styles.resultText}>{calories}</Text>
            </>
          )}
        </View>
      )}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

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
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default FoodDatabaseScreen;

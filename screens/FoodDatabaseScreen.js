// FoodDatabaseScreen.js

// Implementing a functionality that allows users
// to search for foods and view their nutritional information.

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MealPlanContext } from '../MealPlanContext';

const FoodDatabaseScreen = () => {
  const { mealPlan, addToMealPlan } = useContext(MealPlanContext);

  const [searchFood, setSearchFood] = useState('');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

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

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
    setShowSelectionModal(true);
  };

  const handleAddToMealPlan = () => {
    if (selectedFood && quantity && selectedMeal && selectedDay) {
      addToMealPlan(selectedDay, selectedMeal, {
        foodName: selectedFood.foodName,
        calories: selectedFood.calories,
        quantity: quantity,
      });

      setSelectedFood(null);
      setQuantity('');
      setSelectedMeal('');
      setSelectedDay('');
      setShowSelectionModal(false);
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
        <Button title="Search" onPress={handleSearch} color="orange" />
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
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => handleFoodSelection({ foodName, calories })}
          >
            <Text style={styles.selectButtonText}>Select Food</Text>
          </TouchableOpacity>
        </View>
      )}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Modal
        visible={showSelectionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSelectionModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to Meal Plan</Text>
            <Text style={styles.modalLabel}>Food Name:</Text>
            <Text style={styles.modalText}>{selectedFood?.foodName}</Text>
            <Text style={styles.modalLabel}>Quantity:</Text>
            <TextInput
              style={styles.modalInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <Text style={styles.modalLabel}>Meal:</Text>
            <Picker
              style={styles.modalPicker}
              selectedValue={selectedMeal}
              onValueChange={(value) => setSelectedMeal(value)}
            >
              <Picker.Item label="Select meal" value="" />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snack" value="Snack" />
            </Picker>
            <Text style={styles.modalLabel}>Day:</Text>
            <Picker
              style={styles.modalPicker}
              selectedValue={selectedDay}
              onValueChange={(value) => setSelectedDay(value)}
            >
              <Picker.Item label="Select day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            <Button
              title="Add to Meal Plan"
              onPress={handleAddToMealPlan}
              disabled={!quantity || !selectedMeal || !selectedDay}
            />
            <Button title="Cancel" onPress={() => setShowSelectionModal(false)} color="orange" />
          </View>
        </View>
      </Modal>
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
  selectButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  modalPicker: {
    marginBottom: 16,
  },
});

export default FoodDatabaseScreen;

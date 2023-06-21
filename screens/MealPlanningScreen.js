// MealPlanningScreen.js

// Implementing a functionality that allows users to plan their meals for the week
// and get a summary of the planned meals with the total calories for each day.

import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MealPlanContext } from '../MealPlanContext';
import { useNavigation } from '@react-navigation/native';

const MealPlanningScreen = () => {
  const { mealPlan, removeFromMealPlan } = useContext(MealPlanContext);
  const navigation = useNavigation();

  const handleAddFood = () => {
    navigation.navigate('Food Database');
  };

  const calculateMealCalories = (foods) => {
    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += parseFloat(food.calories) * parseFloat(food.quantity);
    });
    return totalCalories;
  };

  const calculateDayCalories = (day) => {
    let totalCalories = 0;
    const meals = mealPlan[day];
    Object.values(meals).forEach((foods) => {
      totalCalories += calculateMealCalories(foods);
    });
    return totalCalories.toFixed(2);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.addButtonLabel}>ADD FOOD</Text>
        </TouchableOpacity>
        {Object.entries(mealPlan).map(([day, meals]) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day}</Text>
            {Object.entries(meals).map(([mealType, foods]) => (
              <View key={mealType} style={styles.mealContainer}>
                <Text style={styles.mealTitle}>{mealType}</Text>
                {foods.length === 0 ? (
                  <Text>No food items yet</Text>
                ) : (
                  <>
                    {foods.map((food, foodIndex) => (
                      <View key={foodIndex} style={styles.foodItemContainer}>
                        <Text style={styles.foodItemText}>{food.foodName} x {food.quantity} — {food.calories} calories</Text>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeFromMealPlan(day, mealType, foodIndex)}
                        >
                          <Text style={styles.removeButtonText}>X</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <Text style={styles.caloriesText}>
                      Total Calories: {calculateMealCalories(foods).toFixed(2)}
                    </Text>
                  </>
                )}
              </View>
            ))}
            <Text style={styles.dayCalories}>
              Total Calories for {day}: {calculateDayCalories(day)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginBottom: 8,
  },
  mealContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  caloriesText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#00A36C',
  },
  dayCalories: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A36C',
  },
  foodItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodItemText: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'green',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MealPlanningScreen;

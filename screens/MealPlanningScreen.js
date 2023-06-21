// MealPlanningScreen.js

// Implementing a functionality that allows users to plan their meals for the week
// and get a summary of the planned meals with the total calories for each day.

import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MealPlanContext } from '../MealPlanContext';

const MealPlanningScreen = () => {
  const { mealPlan } = useContext(MealPlanContext);

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
    return totalCalories;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
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
                    {foods.map((food, index) => (
                      <Text key={index}>{food.foodName} x {food.quantity} — {food.calories} calories</Text>
                    ))}
                    <Text style={styles.caloriesText}>
                      Total Calories: {calculateMealCalories(foods)}
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
});

export default MealPlanningScreen;

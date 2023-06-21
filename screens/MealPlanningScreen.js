// MealPlanningScreen.js

// Implementing a functionality that allows users to plan their meals for the week
// and get a summary of the planned meals with the total calories for each day.

import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MealPlanContext } from '../MealPlanContext';

const MealPlanningScreen = () => {
  const { mealPlan } = useContext(MealPlanContext);

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
                  foods.map((food, index) => (
                    <Text key={index}>{food.foodName} - {food.calories}</Text>
                  ))
                )}
              </View>
            ))}
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
  },
});

export default MealPlanningScreen;

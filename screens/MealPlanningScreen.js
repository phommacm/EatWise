// MealPlanningScreen.js

// Implementing a functionality that allows users to plan their meals for the week 
// and get a summary of the planned meals with the total calories for each day.

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MealPlanningScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Monday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Tuesday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Wednesday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Thursday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Friday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Saturday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>

        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Sunday</Text>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
          </View>
        </View>
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

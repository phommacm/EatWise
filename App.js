// App.js

// Entry point of the application.

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthGoalsScreen from './screens/HealthGoalsScreen';
import FoodDatabaseScreen from './screens/FoodDatabaseScreen';
import MealPlanningScreen from './screens/MealPlanningScreen';
import { MealPlanProvider } from './MealPlanContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MealPlanProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Health Goals" component={HealthGoalsScreen} />
          <Tab.Screen name="Food Database" component={FoodDatabaseScreen} />
          <Tab.Screen name="Meal Planning" component={MealPlanningScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </MealPlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

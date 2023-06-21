// MealPlanContext.js

// Implementing a functionality to manage and share the meal plan data
// between MealPlanningScreen.js and FoodDatabaseScreen.js.

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MealPlanContext = React.createContext({
  mealPlan: {},
  addToMealPlan: () => {},
  removeFromMealPlan: () => {},
});

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Tuesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Wednesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Thursday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Friday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Saturday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Sunday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  });

  useEffect(() => {
    loadMealPlan();
  }, []);

  useEffect(() => {
    saveMealPlan();
  }, [mealPlan]);

  const loadMealPlan = async () => {
    try {
      const storedMealPlan = await AsyncStorage.getItem('mealPlan');
      if (storedMealPlan) {
        setMealPlan(JSON.parse(storedMealPlan));
      }
    } catch (error) {
      console.error('Error loading meal plan from storage:', error);
    }
  };

  const saveMealPlan = async () => {
    try {
      await AsyncStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    } catch (error) {
      console.error('Error saving meal plan to storage:', error);
    }
  };

  const addToMealPlan = (day, meal, food) => {
    const updatedMealPlan = {
      ...mealPlan,
      [day]: {
        ...mealPlan[day],
        [meal]: [...mealPlan[day][meal], food],
      },
    };
    setMealPlan(updatedMealPlan);
  };

  const removeFromMealPlan = (day, mealType, foodIndex) => {
    const updatedMealPlan = { ...mealPlan };

    if (
      updatedMealPlan[day] &&
      updatedMealPlan[day][mealType] &&
      updatedMealPlan[day][mealType].length > foodIndex
    ) {
      updatedMealPlan[day][mealType].splice(foodIndex, 1);
      setMealPlan(updatedMealPlan);
    }
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan, addToMealPlan, removeFromMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

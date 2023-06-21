// MealPlanContext.js

// Implementing a functionality to manage and share the meal plan data
// between MealPlanningScreen.js and FoodDatabaseScreen.js.

import React, { useState } from 'react';

export const MealPlanContext = React.createContext({
  mealPlan: {},
  addToMealPlan: () => {},
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

  return (
    <MealPlanContext.Provider value={{ mealPlan, addToMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

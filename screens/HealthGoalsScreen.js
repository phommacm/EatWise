// HealthGoalsScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HealthGoalsScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const handleHealthGoalChange = (value) => {
    setHealthGoal(value);
  };

  const handleSubmit = () => {
    // Subject to change, debug purpose as of now
    console.log('Form submitted:', {
      age,
      gender,
      height,
      weight,
      activityLevel,
      healthGoal,
    });
  };

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);
  
    let bmr = 0;
  
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
    }
  
    let adjustedBMR = 0;
  
    switch (activityLevel) {
      case 'sedentary':
        adjustedBMR = bmr * 1.2;
        break;
      case 'lightly_active':
        adjustedBMR = bmr * 1.375;
        break;
      case 'moderately_active':
        adjustedBMR = bmr * 1.55;
        break;
      case 'very_active':
        adjustedBMR = bmr * 1.725;
        break;
      case 'super_active':
        adjustedBMR = bmr * 1.9;
        break;
      default:
        adjustedBMR = bmr;
        break;
    }
  
  let adjustedCaloricIntake = adjustedBMR;

  switch (healthGoal) {
    case 'weight_loss':
      adjustedCaloricIntake = adjustedBMR * 0.9;
      break;
    case 'weight_gain':
      adjustedCaloricIntake = adjustedBMR * 1.1;
      break;
    default:
      adjustedCaloricIntake = adjustedBMR;
      break;
  }

  return adjustedCaloricIntake.toFixed(0);
};

  const isFormValid = age.trim() !== '' && gender.trim() !== '' && gender !== 'choose_option' && height.trim() !== '' && weight.trim() !== '' && activityLevel.trim() !== '' && activityLevel !== 'choose_option' && healthGoal.trim() !== '' && healthGoal !== 'choose_option';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Goals</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={handleAgeChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={handleGenderChange}
        >
          <Picker.Item label="Choose an option" value="choose_option" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <Text style={styles.label}>Height (in cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={handleHeightChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight (in kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Activity Level</Text>
        <Picker
          style={styles.picker}
          selectedValue={activityLevel}
          onValueChange={handleActivityLevelChange}
        >
          <Picker.Item label="Choose an option" value="choose_option" />
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Lightly active" value="lightly_active" />
          <Picker.Item label="Moderately active" value="moderately_active" />
          <Picker.Item label="Very active" value="very_active" />
          <Picker.Item label="Super active" value="super_active" />
        </Picker>

        <Text style={styles.label}>Health Goal</Text>
        <Picker
          style={styles.picker}
          selectedValue={healthGoal}
          onValueChange={handleHealthGoalChange}
        >
          <Picker.Item label="Choose an option" value="choose_option" />
          <Picker.Item label="Weight Loss" value="weight_loss" />
          <Picker.Item label="Weight Maintenance" value="weight_maintenance" />
          <Picker.Item label="Weight Gain" value="weight_gain" />
        </Picker>

        <Button title="Submit" onPress={handleSubmit} disabled={!isFormValid} />

        {isFormValid && (
          <Text style={styles.bmrText}>BMR: {calculateBMR()} calories</Text>
        )}
      </View>
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
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  picker: {
    marginBottom: 16,
  },
  bmrText: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
  },
});

export default HealthGoalsScreen;

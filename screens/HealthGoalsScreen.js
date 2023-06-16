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
    console.log('Form submitted:', {
      age,
      gender,
      height,
      weight,
      activityLevel,
      healthGoal,
    });
  };

  const isFormValid = age && gender && height && weight && activityLevel && healthGoal;

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
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light Exercise" value="light_exercise" />
          <Picker.Item label="Moderate Exercise" value="moderate_exercise" />
          <Picker.Item label="Heavy Exercise" value="heavy_exercise" />
        </Picker>

        <Text style={styles.label}>Health Goal</Text>
        <Picker
          style={styles.picker}
          selectedValue={healthGoal}
          onValueChange={handleHealthGoalChange}
        >
          <Picker.Item label="Weight Loss" value="weight_loss" />
          <Picker.Item label="Weight Maintenance" value="weight_maintenance" />
          <Picker.Item label="Weight Gain" value="weight_gain" />
        </Picker>

        <Button title="Submit" onPress={handleSubmit} disabled={!isFormValid} />
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
});

export default HealthGoalsScreen;
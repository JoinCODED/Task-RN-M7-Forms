import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from 'react-native';
import Button from './components/Button';
import Input from './components/Input';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.view}>
          <Button title="Pay" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: { paddingTop: 50, paddingHorizontal: 20 },
  title: { color: '#D8CCA3', fontSize: 40, fontWeight: 'bold' },
  view: { marginVertical: 20 },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 7,
  },
});

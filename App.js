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
  const [inputs, setInputs] = useState({
    credit: '',
    email: '',
    fullname: '',
    phone: '',
    pin: '',
    expiration: '',
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const emailInput = useRef();
  const fullNameInput = useRef();
  const phoneInput = useRef();
  const pinInput = useRef();
  const creditInput = useRef();

  let schema = yup.object().shape({
    credit: yup
      .string()
      .min(16)
      .max(16)
      .required('Credit card number is required'),
    fullname: yup.string().min(3).required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    pin: yup.string().required().min(6),
    expiration: yup.date().min(new Date().toLocaleDateString()).required(),
  });

  const validate = async () => {
    Keyboard.dismiss();
    for (const field in inputs) {
      try {
        await schema.validateAt(field, inputs);
      } catch (error) {
        handleError(error.errors[0], field);
      }
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.view}>
          <Input
            keyboardType="number-pad"
            onChangeText={(text) => handleOnchange(text, 'credit')}
            onFocus={() => handleError(null, 'credit')}
            iconName="cc-visa"
            label="Credit Card Number"
            placeholder="0000-0000-0000-0000"
            reference={creditInput}
            onSubmitEditing={() => {
              emailInput.current.focus();
            }}
            error={errors.credit}
          />
          <Input
            keyboardType="email-address"
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="envelope"
            label="Email"
            reference={emailInput}
            placeholder="Enter your email address"
            onSubmitEditing={() => {
              fullNameInput.current.focus();
            }}
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="user"
            label="Full Name"
            placeholder="Enter your full name"
            reference={fullNameInput}
            onSubmitEditing={() => {
              pinInput.current.focus();
            }}
            error={errors.fullname}
          />

          <Input
            keyboardType="number-pad"
            onChangeText={(text) => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone"
            label="Phone Number"
            reference={phoneInput}
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="key"
            label="Pin"
            placeholder="Enter your pin"
            reference={pinInput}
            onSubmitEditing={() => {
              setShow(true);
            }}
            error={errors.pin}
            password
          />
          {show && (
            <DateTimePicker
              display="default"
              value={new Date()}
              mode="date"
              onChange={(event, date) => {
                handleOnchange(
                  new Date(date).toLocaleDateString(),
                  'expiration'
                );
                setShow(false);
              }}
            />
          )}

          <Button
            title="Expiration"
            onPress={() => {
              setShow(true);
            }}
          />
          {errors.expiration && (
            <Text style={styles.errorText}>{errors.expiration}</Text>
          )}

          <Button title="Pay" onPress={validate} />
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

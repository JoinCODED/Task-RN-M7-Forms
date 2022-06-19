import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  reference,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? 'red' : isFocused ? '#87805E' : '#F3F4FB',
            alignItems: 'center',
            borderRadius: 10,
          },
        ]}
      >
        <Icon name={iconName} style={styles.icon} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={styles.input}
          {...props}
          ref={reference}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye' : 'eye-slash'}
            style={styles.passwordIcon}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#BABBC3',
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 7,
  },
  icon: {
    color: '#87805E',
    fontSize: 22,
    marginRight: 10,
  },
  input: {
    color: '#87805E',
    flex: 1,
  },
  passwordIcon: {
    color: '#87805E',
    fontSize: 22,
  },
});

export default Input;

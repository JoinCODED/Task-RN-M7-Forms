# Payment Form 💳

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-RN-M7-Forms) to your `Development` folder.

1. You have the input component and the styles ready for you.
2. Create a form with the following fields:

```
cardNumber
email
fullName
phone
pin
```

3. Validation as follows:

```
cardNumber: {
  required: true,
  minLength: 16,
  maxLength: 16,
},
email: {
  required: true,
  email: true,
},
fullName: {
  required: true,
  minLength: 3,
  maxLength: 20,
},
phone: {
  required: true,
  minLength: 10,
  maxLength: 10,
},
pin: {
  required: true,
  minLength: 4,
  maxLength: 4,
},
```

4. Use `yup` to validate the form.
5. Create `handleChange` and `handleError` functions.
6. Create a `validate` function that calls `yup.validate`.
7. Pass the `validate` function to the `pay` button.
8. Pass `handleChange` and `handleError` functions to the `Input` component.

### 🍋 Pin field

Turn the pin field into a secure input, with a button to reveal the pin.

### 🤼‍♂️ Expiration date field

Use this package to create a date picker: [react-native-datepicker](https://docs.expo.dev/versions/latest/sdk/date-time-picker/)

Create a button that opens the date picker.

Validate the date so that you can't choose a date in the past.

### 🌶 useRef

Assign a reference to each input field so that you can access it later.

Use `onSubmitEditing` to focus on the next input field after the user clicks next on the keyboard.

Hint:

`App.js`:

```js
const creditInput = useRef();
```

```js
<Input
[...]
  iconName="cc-visa"
  label="Credit Card Number"
  placeholder="0000-0000-0000-0000"
  reference={creditInput}
  onSubmitEditing={() => {
    emailInput.current.focus();
  }}
[...]
/>
```

`Input.js`:

```js
<TextInput
  autoCorrect={false}
  onFocus={() => {
    onFocus();
    setIsFocused(true);
  }}
  onBlur={() => setIsFocused(false)}
  style={styles.input}
  {...props}
  ref={reference}
/>
```

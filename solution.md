1. Create a form with the following fields:

```js
<Input
            iconName="cc-visa"
            label="Credit Card Number"
            placeholder="0000-0000-0000-0000"
          />
          <Input
            iconName="envelope"
            label="Email"
            placeholder="Enter your email address"
          />

          <Input
            iconName="user"
            label="Full Name"
            placeholder="Enter your full name"
          />

          <Input
            iconName="phone"
            label="Phone Number"
            placeholder="Enter your phone no"
          />
          <Input
            iconName="key"
            label="Pin"
            placeholder="Enter your pin"
            password
          />
```

3. Validation as follows:

```js
let schema = yup.object().shape({
  credit: yup
    .string()
    .min(16)
    .max(16)
    .required('Credit card number is required'),
  fullname: yup.string().min(3).required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  pin: yup.string().required().min(4),
});
```

4. Use `yup` to validate the form.

5. Create `handleChange` and `handleError` functions.

```js
const [show, setShow] = useState(false);
const [errors, setErrors] = useState({});

const handleOnchange = (text, input) => {
  setInputs((prevState) => ({ ...prevState, [input]: text }));
};
const handleError = (error, input) => {
  setErrors((prevState) => ({ ...prevState, [input]: error }));
};
```

6. Create a `validate` function that calls `yup.validate`.

```js
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
```

7. Pass the `validate` function to the `pay` button.

```js
<Button title="Pay" onPress={validate} />
```

8. Pass `handleChange` and `handleError` functions to the `Input` component.

```js
<Input
  keyboardType="number-pad"
  onChangeText={(text) => handleOnchange(text, 'credit')}
  onFocus={() => handleError(null, 'credit')}
  iconName="cc-visa"
  label="Credit Card Number"
  placeholder="0000-0000-0000-0000"
  error={errors.credit}
/>
```

### 🍋 Pin field

Turn the pin field into a secure input, with a button to reveal the pin.

```js
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
```

Input.js

```js
const [hidePassword, setHidePassword] = useState(password);
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
/>;
{
  password && (
    <Icon
      onPress={() => setHidePassword(!hidePassword)}
      name={hidePassword ? 'eye' : 'eye-slash'}
      style={styles.passwordIcon}
    />
  );
}
```

### 🤼‍♂️ Expiration date field

Use this package to create a date picker: [react-native-datepicker](https://docs.expo.dev/versions/latest/sdk/date-time-picker/)

Create a button that opens the date picker.

```js
const [show, setShow] = useState(false);
[...]
{
  show && (
    <DateTimePicker
      display="default"
      value={new Date()}
      mode="date"
      onChange={(event, date) => {
        handleOnchange(new Date(date).toLocaleDateString(), 'expiration');
        setShow(false);
      }}
    />
  );
}

<Button
  title="Expiration"
  onPress={() => {
    setShow(true);
  }}
/>;
```

Validate the date so that you can't choose a date in the past.

```js
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
```

### 🌶 useRef

Assign a reference to each input field so that you can access it later.

Use `onSubmitEditing` to focus on the next input field after the user clicks next on the keyboard.

Hint:

`App.js`:

```js
const emailInput = useRef();
const fullNameInput = useRef();
const phoneInput = useRef();
const pinInput = useRef();
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
```

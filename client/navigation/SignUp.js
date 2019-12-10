
import React from 'react';
import { View, StyleSheet, Button, AsyncStorage, Text } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  fullName: t.String,
  email: t.String,
  password: t.String,
  
});

//TODO first make sure everything you can validate it. Is it an email...name...
const options = {
  fields: {
    fullName: {
      error: 'Enter your name'
    },
    email: {
      error: 'Enter an email'
    },
    password: {
      error: 'Enter a password'
    },
  },
};
//TODO check if the username isn't taken.
//TODO Generate the JWT for signup. 
//TODO Generate Error if the user did not input the needed information
export default class SignUp extends React.Component {
  state = {signuperror: ''}
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    // ; 
    fetch('https://jakoobackend.herokuapp.com/signUp', {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userFullName: value.fullName,
    userPassword: value.password,
    userEmail: value.email,
  })
}).then((response) => response.json())
  .then(async (responseJson) => {
    if (responseJson.token) {
      await AsyncStorage.setItem('userToken', responseJson.token);
      this.props.navigation.navigate('Main')
    } else if (responseJson.error){
      this.setState({signuperror: responseJson.error})
      this.props.navigation.navigate('SignUp')
    }
  }).catch((error) => {
    console.log("there is a problem")
  })
}
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User} 
          options={options}
        />
        {this.state.signuperror === 'User Email Already Exists' && <Text> 'User Email Already Exists'</Text>}
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
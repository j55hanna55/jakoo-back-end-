
import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

//TODO first make sure everything you can validate it. Is it an email...name...
const options = {
  fields: {
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
export default class SignIn extends React.Component {
  state = {signinerror: ''}
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if (value) {
      fetch('https://jakoobackend.herokuapp.com/signIn', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPassword: value.password,
          userEmail: value.email,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
         if (responseJson.token !== undefined) {
           this.props.navigation.navigate('Main') 
         } else {
          this.setState({signinerror: responseJson.error})
           this.props.navigation.navigate('SignIn')
         }
        }).catch((error) => {
          console.log(error.message)
        })
  }
}
  signUp = () => {
    this.props.navigation.navigate('SignUp')
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.headerText}> Welcome to Jakoo</Text>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User} 
          options={options}
        />
            {this.state.signinerror === 'Invalid Credentials' && <Text> 'Invalid Credentials'</Text>}
        <Button
          title="Sign In!"
          onPress={this.handleSubmit}
        />
        <Button 
        title="Sign Up!"
        onPress={this.signUp}
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
  headerText: {
      justifyContent: 'center',
      padding: 80,
      fontSize: 20,

  }
});
import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
export default class MessengerScreen extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.linkedin.com'}}
        style={{marginTop: 20}}
      />
    );
  }
}
  MessengerScreen.navigationOptions = {
  title: 'LinkedIn',
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
export default class WhatsappScreen extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://twitter.com/'}}
        style={{marginTop: 20}}
      />
    );
  }
}
  WhatsappScreen.navigationOptions = {
  title: 'Twitter',
};
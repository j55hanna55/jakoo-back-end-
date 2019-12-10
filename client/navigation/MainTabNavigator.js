import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FacebookScreen from '../screens/FacebookScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WhatsappScreen from '../screens/WhatsappScreen';
import InstagramScreen from '../screens/InstagramScreen';
import MessengerScreen from '../screens/MessengerScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// FacebookScreen
const FacebookStack = createStackNavigator(
  {
    Links: FacebookScreen,
  },
  config
);

FacebookStack.navigationOptions = {
  tabBarLabel: 'Facebook',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-facebook' : 'logo-facebook'} />
  ),
};

FacebookStack.path = '';

// WhatsappScreen
const WhatsappStack = createStackNavigator(
  {
    Whatsapp: WhatsappScreen,
  },
  config
);

WhatsappStack.navigationOptions = {
  tabBarLabel: 'Twitter',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-twitter' : 'logo-twitter'} />
  ),
};

WhatsappStack.path = '';


// SettingsScreen
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


// InstagramScreen
const InstagramStack = createStackNavigator(
  {
    Instagram: InstagramScreen,
  },
  config
);

InstagramStack.navigationOptions = {
  tabBarLabel: 'Instagram',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-instagram' : 'logo-instagram'} />
  ),
};

InstagramStack.path = '';

const MessengerStack = createStackNavigator(
  {
    Links: MessengerScreen,
  },
  config
);

MessengerStack.navigationOptions = {
  tabBarLabel: 'LinkedIn',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-linkedin' : 'logo-linkedin'} />
  ),
};

MessengerStack.path = '';
// MessengerScreen
// const MessengerStack = createStackNavigator(
//   {
//     Messenger: MessengerScreen,
//   },
//   config
// );

// MessengerStack.navigationOptions = {
//   tabBarLabel: 'Messenger',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-facebook ' : 'logo-facebook'} />
//   ),
// };

// MessengerStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FacebookStack,
  InstagramStack,
  MessengerStack,
  WhatsappStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;

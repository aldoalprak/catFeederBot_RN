import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, YellowBox } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import HomeScreen from "./src/containers/Home";
import ModeScreen from "./src/containers/Mode";
import SideBar from "./src/components/Sidebar";
import NotificationScreen from "./src/containers/Notifications.js";
import ProfileScreen from "./src/containers/Profile.js";
import LoginScreen from "./src/containers/Login.js";
import RegisterScreen from "./src/containers/Register.js";
import EditProfileScreen from "./src/components/EditProfile";


const RootStack = createDrawerNavigator(
  {
    Dashboard: { screen: HomeScreen },
    "Schedule Feed": { screen: ModeScreen },
    Notifications: { screen: NotificationScreen },
    Profile: { screen: ProfileScreen },
    Logout: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    EditProfile: { screen: EditProfileScreen },
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: props => <SideBar {...props} />
  }
);

export default class App extends Component {
  constructor() {
    super();
    YellowBox.ignoreWarnings(['Setting a timer']);
  }
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

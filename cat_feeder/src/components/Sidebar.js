import React from "react";
import { AppRegistry, Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import Store from '../mobx/store'

const routes = ["Dashboard", "Schedule Feed", "Notifications", "Profile"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Content>
        <Image
          source={{
            uri:
              "https://st3.depositphotos.com/7370560/18104/v/450/depositphotos_181043190-stock-illustration-dog-and-cat-best-friends.jpg"
          }}
          style={{
            height: 170,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <ListItem
          button
          onPress={() => this.props.navigation.navigate("Dashboard")}
        >
          <Text>Dashboard</Text>
        </ListItem>
        <ListItem
          button
          onPress={() => this.props.navigation.navigate("Schedule Feed")}
        >
          <Text>Schedule Feed</Text>
        </ListItem>
        <ListItem
          button
          onPress={() => this.props.navigation.navigate("Notifications")}
        >
          <Text>Notifications</Text>
        </ListItem>
        <ListItem
          button
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Text>Profile</Text>
        </ListItem>
        <ListItem
          button
          onPress={() => Store.logout(this.props)}
        >
          <Text>Logout</Text>
        </ListItem>
      </Content>
    );
  }
}

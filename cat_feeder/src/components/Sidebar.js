import React from "react";
import { AppRegistry, Image, StatusBar,View } from "react-native";
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
        <List
          dataArray={routes}
          renderRow={data => {
            return (
              <View>
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
                <ListItem
                  button
                  onPress={() => Store.logout()}
                >
                </ListItem>
              </View>
            );
          }}
        />
      </Content>
    );
  }
}

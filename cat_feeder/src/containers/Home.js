import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native";
import { Button, Text, Icon } from "native-base";
import styles from "../styles";
import Header from "../components/Header";
import PercentageCircle from "react-native-percentage-circle";
import db from "../helpers/firebase.js";
import { AsyncStorage } from "react-native"
import Store from '../mobx/store'

class Home extends Component {


  async componentDidMount() {
    const token = await AsyncStorage.getItem("uid")
    if (!token) {
      this.props.navigation.navigate("Logout")
    } else {
      Store.getData()
    }
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <PercentageCircle
            radius={120}
            percent={80}
            color={"green"}
            innerColor={"white"}
            bgcolor={"#e3e3e3"} // sisa
            borderWidth={25}
            children={<Text> Food Meter</Text>}
          >

            {/* <Image style={{width:20,height:20}} source={{require('your image')}} /> */}
          </PercentageCircle>
          <Button iconLeft rounded success style={styles.feedButton}>
            <Icon name="paw" />
            <Text>Feed ME!</Text>
          </Button>

          <Button rounded style={styles.lastFedButton}>
            <Text>Last Fed: 25/07/2018 at 16.00 {Store.state.token}</Text>
          </Button>
        </View>

      </View>
    );
  }
}

export default Home;

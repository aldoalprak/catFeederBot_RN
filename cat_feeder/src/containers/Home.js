import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native";
import { Button, Thumbnail, Text, Icon } from "native-base";
import styles from "../styles";
import Header from "../components/Header";
import ProgressCircle from "react-native-progress-circle";
import db from "../helpers/firebase.js";
import { AsyncStorage } from "react-native"
import Store from '../mobx/store'
import { observer } from 'mobx-react'

@observer class Home extends Component {


  async componentDidMount() {
    const token = await AsyncStorage.getItem("uid")
    if (!token) {
      this.props.navigation.navigate("Logout")
    } else {
      // alert("masuk")
      Store.getData()
      Store.getFeeder()
      Store.getNotif()
    }
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} />


        <View style={styles.container}>
          <Text>{Store.state.catName}</Text>
          <Thumbnail
            style={{
              zIndex: -1,
              marginBottom: 10
            }}
            large
            source={{ uri: Store.state.imageUrl }}
          />

          <ProgressCircle
            percent={Store.state.foodLevel}
            radius={95}
            borderWidth={10}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
            style={{ marginTop: 20 }}
          >
            <Text style={{ fontSize: 22 }}>Food Meter</Text>
            <Text style={{ fontSize: 18 }}>{Store.state.foodLevel}%</Text>
          </ProgressCircle>

          <Button iconLeft rounded success style={styles.feedButton} onPress={() => Store.feedMe()}>
            <Icon name="paw" />
            <Text>Feed ME NOW!</Text>
          </Button>

          <Button rounded style={styles.lastFedButton}>
            <Text>Last Feed : {Store.state.lastFeed}</Text>
          </Button>
        </View>

      </View>
    );
  }
}

export default Home;

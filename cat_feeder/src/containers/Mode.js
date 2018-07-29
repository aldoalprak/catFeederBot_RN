import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Switch,
  ListItem,
  Text,
  List
} from "native-base";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { observer } from 'mobx-react'
import Store from '../mobx/store.js'
import styles from "../styles/index.js";

@observer class Mode extends Component {

  _handleDatePicked(time) {
    // console.log("====", Number(time.toLocaleTimeString('it-IT').slice(0, 5).split(":").join("")))
    Store._hideDateTimePicker();
    Store.state.timeMorning = time.toLocaleTimeString('it-IT').slice(0, 5)
  };

  _handleDatePicked2(time) {
    console.log("====", time.toLocaleTimeString('it-IT'))
    Store._hideDateTimePicker2();
    Store.state.timeEvening = time.toLocaleTimeString('it-IT').slice(0, 5)

  };


  render() {
    return (
      <View>
        <Header
          androidStatusBarColor="#01AC9A"
          style={{ backgroundColor: "#01AC9A" }}
        >
          <Left>
            <Button onPress={() => this.props.navigation.navigate("Dashboard")} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Schedule Feed</Title>
          </Body>
        </Header>

        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#1d6b99" }}>
              <Icon active name="clock" />
            </Button>
          </Left>
          <Body>
            <Text>Automatic Mode</Text>
          </Body>
          <Right>
            <Switch
              value={Store.state.modeStatus}
              onValueChange={() => Store.statusChange()}
            />
          </Right>
        </ListItem>

        {Store.state.modeStatus ?

          <View style={{ marginTop: 50 }}>
            <List>
              <ListItem thumbnail>
                <Left>
                  <Button rounded style={{ backgroundColor: "#f2f20e" }}>
                    <Icon active name="cloud" />
                  </Button>
                </Left>
                <Body>
                  <Text>Morning Feed</Text>
                  <Text note numberOfLines={1}>{Store.state.timeMorning}</Text>
                </Body>
                <Right>
                  <Button success rounded onPress={() => Store._showDateTimePicker()}>
                    <Text>Set</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail style={{ marginTop: 45 }}>
                <Left>
                  <Button rounded style={{ backgroundColor: "#4155f4" }}>
                    <Icon active name="moon" />
                  </Button>
                </Left>
                <Body>
                  <Text>Evening Feed</Text>
                  <Text note numberOfLines={1}>{Store.state.timeEvening}</Text>
                </Body>
                <Right>
                  <Button success rounded onPress={() => Store._showDateTimePicker2()}>
                    <Text>Set</Text>
                  </Button>
                </Right>
              </ListItem>
            </List>

            <DateTimePicker
              mode="time"
              isVisible={Store.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked.bind(this)}
              onCancel={() => Store._hideDateTimePicker()}
              is24Hour={true}
            />
            <DateTimePicker
              mode="time"
              isVisible={Store.state.isDateTimePickerVisible2}
              onConfirm={this._handleDatePicked2.bind(this)}
              onCancel={() => Store._hideDateTimePicker2()}
              is24Hour={true}
            />
          </View>
          : <Text />}
      </View>
    );
  }
}

export default Mode;

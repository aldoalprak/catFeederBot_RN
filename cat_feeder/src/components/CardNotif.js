import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Card, CardItem, Right, Text, Button, Icon, Left, Body } from 'native-base';
import Store from '../mobx/store'
import { observer } from 'mobx-react'
import { db } from "../helpers/firebase.js";

@observer export default class CardNotif extends Component {

    componentDidMount() {
        Store.getNotif()
        Store.state.listNotif
    }

    async componentWillUnmount() {
        const token = await AsyncStorage.getItem("uid")
        db.ref(`feeders/${token}/message`).off("value")
    }

    render() {
        const styles = StyleSheet.create({
            contentContainer: {
                paddingVertical: 50
            }
        });
        return (

            <ScrollView contentContainerStyle={styles.contentContainer}>

                {Store.state.listNotif.map((key, index) => {
                    return (
                        <Card style={{ flex: 0 }} key={index}>
                            <CardItem>
                                <Left>
                                    <Button rounded style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="ios-notifications" />
                                    </Button>
                                    <Text note>{key.slice(11, 16)}</Text>
                                </Left>
                                <Right>
                                    <Text></Text>
                                    <Text note>{key.slice(0, 10)}</Text>
                                </Right>

                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        {key.slice(20)}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
                }
            </ScrollView>
        );
    }
}

import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Right, Text, Button, Icon, Left, Body, View } from 'native-base';
import Store from '../mobx/store'
import { observer } from 'mobx-react'

@observer export default class CardNotif extends Component {

    componentDidMount() {
        // Store.getNotif()
        console.log(Store.state.listNotif, "////")
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
                                    {/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} /> */}
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

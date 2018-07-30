import React, { Component } from 'react';
import { Image, ScrollView, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View } from 'native-base';
import Store from '../mobx/store'
import { observer } from 'mobx-react'

@observer export default class CardNotif extends Component {

    componentDidMount() {
        // Store.getNotif()
        console.log(Store.state.listNotif, "////")
    }

    render() {
        return (
            // <FlatList
            //     data={[Store.state.listNotif]}
            //     renderItem={({ item }) => <Text>{item.key}</Text>}
            // />

            <ScrollView>
                <View>
                    {Store.state.listNotif ?
                        Object.keys(Store.state.listNotif).map((key, index) => {
                            return (
                                <Card style={{ flex: 0 }} key={index}>
                                    <CardItem>
                                        <Left>
                                            {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                            <Body>
                                                <Text></Text>
                                                <Text note>{Store.state.listNotif[key].slice(0, 10)}</Text>
                                                <Text note>{Store.state.listNotif[key].slice(11, 19)}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            {/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} /> */}
                                            <Text>
                                                {Store.state.listNotif[key].slice(20)}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )
                        })
                        : <Text>Please wait..</Text>}
                </View>
            </ScrollView>
        );
    }
}

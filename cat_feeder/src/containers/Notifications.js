import React, { Component } from "react"
import { View, Text } from 'react-native'
import { Header, Left, Body, Button, Icon, Title } from 'native-base'
import CardNotif from '../components/CardNotif'
import { observer } from 'mobx-react'
import Store from '../mobx/store'

@observer class Notification extends Component {
    render() {
        return (
            <View>
                <Header
                    androidStatusBarColor="#01AC9A"
                    style={{ backgroundColor: "#01AC9A" }}
                >
                    <Left>
                        <Button small onPress={() => {
                            Store.state.notifStatus.val = false;
                            Store.state.notifStatus.redirectFrom = 'back_button';
                            this.props.navigation.navigate("Dashboard")
                        }}
                            transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                </Header>
                <CardNotif />

            </View>
        )
    }
}

export default Notification
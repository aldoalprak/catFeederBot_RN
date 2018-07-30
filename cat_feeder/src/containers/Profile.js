import React, { Component } from 'react'
import {
    Body,
    Text,
    Thumbnail,
    Header,
    Left,
    Button,
    Icon,
    Title,
    ListItem,
    Fab
} from 'native-base'
import { View, StyleSheet, Image } from 'react-native'
import { observer } from 'mobx-react'
import Store from '../mobx/store'

@observer export default class Profile extends Component {

    componentDidMount() {
        Store.getData()
    }

    render() {
        return (
            <View>
                <View>
                    <Header
                        androidStatusBarColor="#01AC9A"
                        style={{ backgroundColor: "#01AC9A" }}
                    >
                        <Left>
                            <Button onPress={() => this.props.navigation.navigate('Dashboard')} transparent>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Profile</Title>
                        </Body>
                    </Header>
                </View>
                <View style={styles.profilePicture}>
                    <Thumbnail
                        style={{
                            zIndex: -1
                        }}
                        large
                        source={{ uri: Store.state.imageUrl }}
                    />
                </View>

                <View style={{ marginTop: 50 }}>
                    <ListItem icon style={styles.listItem}>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="person" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Username</Text>
                            <Text note numberOfLines={1}>{Store.state.username}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon style={styles.listItem}>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="mail" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Email</Text>
                            <Text note numberOfLines={1}>{Store.state.email}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon style={styles.listItem}>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="paw" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Cat Name</Text>
                            <Text note numberOfLines={1}>{Store.state.catName}</Text>
                        </Body>
                    </ListItem>
                </View>
                <View style={{ flex: 1 }}>
                    <Fab
                        containerStyle={{ padding: 20 }}
                        style={{ backgroundColor: 'green' }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('EditProfile')}
                    >
                        <Icon name="create" />
                    </Fab>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    profilePicture: {
        backgroundColor: "#e5e5e0",
        paddingTop: 55,
        paddingBottom: 55,
        zIndex: 1,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        marginBottom: 30
    }
})

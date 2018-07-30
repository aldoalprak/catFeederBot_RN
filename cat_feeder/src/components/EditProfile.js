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
    Right,
    Input,
    Item,
    Label
} from 'native-base'
import { View, StyleSheet, Image, TouchableOpacity, AsyncStorage, ScrollView, KeyboardAvoidingView } from 'react-native'
import Store from '../mobx/store'
import { db } from '../helpers/firebase'
import { observer } from 'mobx-react'


@observer export default class EditProfile extends Component {


    state = {
        profileData: {},
        username: "",
        email: "",
        catName: ""
    }

    componentDidMount() {
        this.getData()
    }


    async getData() {
        const token = await AsyncStorage.getItem("uid")
        db.ref("users/").child(token).once("value", snapshot => {
            this.setState({
                username: snapshot.val().username,
                email: snapshot.val().email,
                catName: snapshot.val().catName
            })
        })
    }

    usernameHandler(text) {
        this.setState({
            username: text
        })
    }

    emailHandler(text) {
        this.setState({
            email: text
        })
    }

    catNameHandler(text) {
        this.setState({
            catName: text
        })
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
                            <Button onPress={() => this.props.navigation.navigate('Profile')} transparent>
                                <Icon name="ios-close" size={30} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Edit Profile</Title>
                        </Body>
                        <Right>
                            <Button onPress={() => Store.onSubmitProfile(this.state.username, this.state.email, this.state.catName, this.props)} transparent>
                                <Icon name="ios-checkmark" size={30} />
                            </Button>
                        </Right>
                    </Header>
                </View>

                <ScrollView >

                    <View style={styles.profilePicture}>
                        <Thumbnail
                            style={{
                                zIndex: -1
                            }}
                            large
                            source={{ uri: Store.state.imageUrl }}
                        />
                        <TouchableOpacity onPress={() => Store.imagePickerHandler()}><Text>Change Photo</Text></TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <ListItem icon style={styles.listItem}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="person" />
                                </Button>
                            </Left>
                            <Body>
                                <Item inlineLabel>
                                    <Label>Username</Label>
                                    <Input value={this.state.username} onChangeText={(text) => { this.usernameHandler(text) }} />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="mail" />
                                </Button>
                            </Left>
                            <Body>
                                <Item inlineLabel>
                                    <Label>Email</Label>
                                    <Input value={this.state.email} onChangeText={(text) => { this.emailHandler(text) }} />
                                </Item>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="paw" />
                                </Button>
                            </Left>
                            <Body>
                                <Item inlineLabel>
                                    <Label>Cat Name</Label>
                                    <Input value={this.state.catName} onChangeText={(text) => { this.catNameHandler(text) }} />
                                </Item>
                            </Body>
                        </ListItem>
                    </View>

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    profilePicture: {
        paddingTop: 10,
        zIndex: 1,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        marginBottom: 5
    },
    contentContainer: {
    }
})

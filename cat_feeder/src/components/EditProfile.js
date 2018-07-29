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
    Right
} from 'native-base'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class Profile extends Component {

    state = {
        data: {
            position: "Kuro",
            education: "Pet",
            profilePicture: null
        }
    }

    imagePickerHandler() {
        ImagePicker.showImagePicker({ title: "Pick an image" }, res => {
            if (res.didCancel) {
                alert("canceled")
            } else if (res.error) {
                alert("error")
            } else {
                console.log("uri===", res.uri, "data===", res.data)
                this.setState({
                    profilePicture: { uri: res.uri }
                })

                fetch("https://us-central1-catfeeder-bot.cloudfunctions.net/storeImage", {
                    method: "POST",
                    body: JSON.stringify({
                        image: res.data
                    })
                })
                    .catch(err => console.log(err))
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes)
                    })

            }
        })
    }

    render() {
        //#4. add profilePicture variable
        const { name, position, education, summary, profilePicture } = this.state.data
        return (
            <View>
                <View>
                    <Header
                        androidStatusBarColor="#01AC9A"
                        style={{ backgroundColor: "#01AC9A" }}
                    >
                        <Left>
                            <Button onPress={() => this.props.navigation.navigate('Profile')} transparent>
                                <Icon name="cross" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Edit Profile</Title>
                        </Body>
                        <Right>
                            <Button onPress={() => this.props.navigation.navigate('Profile')} transparent>
                                <Icon name="ios-checkmark-outline" />
                            </Button>
                        </Right>
                    </Header>
                </View>
                <View style={styles.profilePicture}>
                    {/* <Image style={{
                        height: 120,
                        alignSelf: "stretch",
                        zIndex: -20
                        // justifyContent: "center",
                        // alignItems: "center"
                    }}
                        source={{ uri: "http://www.modafinilsale.com/data/out/41/228044041-cat-backgrounds-for-computer.jpg" }}
                    /> */}
                    <Thumbnail
                        style={{
                            zIndex: -1
                        }}
                        large
                        source={this.state.profilePicture}
                    />
                    <TouchableOpacity onPress={this.imagePickerHandler.bind(this)}><Text>Change Photo</Text></TouchableOpacity>
                </View>

                <View style={{ marginTop: 80 }}>
                    <ListItem icon style={styles.listItem}>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="person" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Owner Name</Text>
                            <Text note numberOfLines={1}>Aldo Prakoso</Text>
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
                            <Text note numberOfLines={1}>aldoprakoso1@gmail.com</Text>
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
                            <Text note numberOfLines={1}>Kuro</Text>
                        </Body>
                    </ListItem>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    //#7. add profilePicture styles with absolute position an       d zIndex larger than another to make on top
    profilePicture: {
        paddingTop: 70,
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

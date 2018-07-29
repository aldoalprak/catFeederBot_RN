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

    state = {
        data: {
            position: "Kuro",
            education: "Pet",
            profilePicture: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        }
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
                        source={Store.state.profilePicture}
                    />
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

import React, { Component } from "react"
import { ScrollView, View, TouchableOpacity, Image } from 'react-native'
import { Text, Content, Form, Item, Input, Button, Title, Header, Body } from "native-base"
import { observer } from "mobx-react"
import Store from '../mobx/store'

@observer export default class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        catName: ""
    }

    usernameChange(text) {
        this.setState({
            username: text
        })
        // alert(this.state.username)
    }

    emailChange(text) {
        this.setState({
            email: text
        })
        // alert(this.state.email)
    }

    passwordChange(text) {
        this.setState({
            password: text
        })
        // alert(this.state.password)
    }

    catNameChange(text) {
        this.setState({
            catName: text
        })
        // alert(this.state.catName)
    }

    render() {
        return (
            <View>
                <Header
                    androidStatusBarColor="#01AC9A"
                    style={{ backgroundColor: "#01AC9A" }}
                >
                </Header>
                <ScrollView>
                    <View style={{ alignItems: "center", justifyContent: "center" }} >
                        <Image source={require('../image/cat_feeder_logo.png')} />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Form>
                            <Item>
                                <Input placeholder="Username" onChangeText={(text) => this.usernameChange(text)} />
                            </Item>
                            <Item>
                                <Input placeholder="Email" onChangeText={(text) => this.emailChange(text)} />
                            </Item>
                            <Item>
                                <Input secureTextEntry={true} type="password" placeholder="Password" onChangeText={(text) => this.passwordChange(text)} />
                            </Item>
                            <Item>
                                <Input placeholder="Cat Name" onChangeText={(text) => this.catNameChange(text)} />
                            </Item>
                        </Form>
                        <Button style={{ marginTop: 30, marginBottom: 5 }} block success rounded large onPress={() => Store.register(this.state.username, this.state.email, this.state.catName, this.state.password, this.props)}>
                            <Text>Register</Text>
                        </Button>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Logout')}><Text>Already have an account?</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
import React, { Component } from "react"
import { View, TouchableOpacity, AsyncStorage, Image, ScrollView } from 'react-native'
import { Text, Content, Form, Item, Input, Button, Header, Body, Title } from "native-base"
import { observer } from 'mobx-react'
import Store from '../mobx/store'


@observer export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    async componentDidMount() {
        // alert("masuk sini")
        const token = await AsyncStorage.getItem("uid")
        if (token) {
            this.props.navigation.navigate("Dashboard")
        }
    }

    emailChange(text) {
        this.setState({
            email: text
        })
    }

    passwordChange(text) {
        this.setState({
            password: text
        })
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
                    <View style={{ marginTop: 40 }}>
                        <Form>
                            <Item>
                                <Input placeholder="Email" onChangeText={(text) => this.emailChange(text)} />
                            </Item>
                            <Item>
                                <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.passwordChange(text)} />
                            </Item>
                        </Form>
                        <Button style={{ marginTop: 30, marginBottom: 5 }} block success rounded large onPress={() => Store.login(this.state.email, this.state.password, this.props)}>
                            <Text>Sign In</Text>
                        </Button>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Register')}><Text>Create Account</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
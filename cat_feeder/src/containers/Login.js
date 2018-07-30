import React, { Component } from "react"
import { View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Text, Content, Form, Item, Input, Button } from "native-base"
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
                {}
                <View style={{ marginTop: 250 }}>
                    <Form>
                        <Item>
                            <Input placeholder="Email" onChangeText={(text) => this.emailChange(text)} />
                        </Item>
                        <Item>
                            <Input placeholder="Password" onChangeText={(text) => this.passwordChange(text)} />
                        </Item>
                    </Form>
                    <Button style={{ marginTop: 30, marginBottom: 5 }} block success rounded large onPress={() => Store.login(this.state.email, this.state.password, this.props)}>
                        <Text>Sign In</Text>
                    </Button>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('Register')}><Text>Create Account</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
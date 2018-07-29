import { observable, action } from 'mobx'
import { db, user, storageRef } from '../helpers/firebase'
import { AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker'

class mobxStore {

    @observable state = {
        modeStatus: false,
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2: false,
        timeMorning: "",
        timeEvening: "",
        profilePicture: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3L3eKHoyB7Gj9S1nDvq5BKQxmygmVzFHiKDP1RlVtfANtxOl" }
    }

    @action
    //========================Register.js===================================
    async register(username, email, catName, password, props) {
        console.log("msk submit", "username=", username, "email", email, "catname=", catName, "password=", password)
        userData = {
            username,
            email,
            password,
            catName
        }
        try {
            const response = await user.createUserWithEmailAndPassword(email, password)
            const snapshot = await db.ref("users/").child(response.user.uid).set(userData)
            user.currentUser.sendEmailVerification()
            console.log(snapshot, "=====")
            props.navigation.navigate('Logout')
        } catch (err) {
            console.log(err)
        }

    }

    async login(email, password, props) {
        console.log("masuklogin", email, password)
        try {
            const response = await user.signInWithEmailAndPassword(email, password)
            if (user.currentUser.emailVerified) {
                // console.log("=========", response.user.uid)
                AsyncStorage.setItem("uid", `${response.user.uid}`)
                props.navigation.navigate("Dashboard")
            } else {
                alert("verify")
            }
        } catch (err) {
            console.log(err)
        }

    }

    //=========================Mode.js=======================================
    _showDateTimePicker() {
        // alert("hello")
        this.state.isDateTimePickerVisible = true
    }

    _showDateTimePicker2() {
        this.state.isDateTimePickerVisible2 = true
    }

    _hideDateTimePicker() {
        this.state.isDateTimePickerVisible = false
    }

    _hideDateTimePicker2() {
        this.state.isDateTimePickerVisible2 = false
    }

    statusChange() {
        if (!this.state.modeStatus) {
            this.state.modeStatus = true
        } else {
            this.state.modeStatus = false
        }
    }

    //==================================EditProfile.js===================================
    imagePickerHandler() {
        ImagePicker.showImagePicker({ title: "Pick an image" }, res => {
            if (res.didCancel) {
                alert("canceled")
            } else if (res.error) {
                alert("error")
            } else {
                console.log("uri===", res.uri, "data===", res.data)
                this.state.profilePicture = { uri: res.uri }

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


}

export default Store = new mobxStore()
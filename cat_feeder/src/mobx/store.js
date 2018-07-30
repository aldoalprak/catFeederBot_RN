import { observable, action } from 'mobx'
import { db, user, storageRef } from '../helpers/firebase'
import { AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker'


class mobxStore {

    @observable state = {
        //====Home==
        foodLevel: 100,
        lastFeed: "",
        //====Mode======
        modeStatus: false,
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2: false,
        timeMorning: "",
        timeEvening: "",
        //=====Profile====
        profpic: {},
        profileData: {},
        username: "",
        usernameEdit: "",
        email: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3L3eKHoyB7Gj9S1nDvq5BKQxmygmVzFHiKDP1RlVtfANtxOl",
        catName: "",
        //=====Notif======
        listNotif: [],
        notifStatus: false,
        objNotif: {}
    }

    @action
    //========================Auth (Register,login,logout)===================================
    async register(username, email, catName, password, props) {
        console.log("msk submit", "username=", username, "email", email, "catname=", catName, "password=", password)
        userData = {
            username,
            email,
            password,
            catName,
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3L3eKHoyB7Gj9S1nDvq5BKQxmygmVzFHiKDP1RlVtfANtxOl"
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
        // alert("masuk login")
        console.log("masuklogin", email, password)
        try {
            const response = await user.signInWithEmailAndPassword(email, password)
            if (user.currentUser.emailVerified) {
                console.log("masuk user")
                // alert("=========", response.user.uid)
                AsyncStorage.setItem("uid", `${response.user.uid}`)
                // const token = await AsyncStorage.getItem("uid")
                // this.state.token = token
                props.navigation.navigate("Dashboard")
            } else {
                alert("verify")
            }
        } catch (err) {
            console.log(err)
        }

    }

    async logout(props) {
        // alert("masuk")
        const remove = await AsyncStorage.removeItem("uid")
        props.navigation.navigate("Logout")
    }
    //=========================Home.js=======================================
    async getData() {
        console.log("masuk getData")
        const token = await AsyncStorage.getItem("uid")
        db.ref("users/").child(token).on("value", snapshot => {
            this.state.profileData = snapshot.val()
            this.state.username = this.state.profileData.username
            this.state.email = this.state.profileData.email
            this.state.catName = this.state.profileData.catName
            this.state.imageUrl = this.state.profileData.imageUrl
            console.log(this.state.profileData)
        })
    }

    async getFeeder() {
        console.log("masuk getfeeder")
        const token = await AsyncStorage.getItem("uid")
        db.ref("feeders/").child(token).on("value", snapshot => {
            this.state.foodLevel = snapshot.val().foodLevel
            this.state.lastFeed = snapshot.val().lastfeed
            console.log(snapshot.val())
        })
    }

    async feedMe() {
        const token = await AsyncStorage.getItem("uid")
        db.ref("/feeders/").child(token).update({
            openBucket: true,
            autoControl: false
        })

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

    async getModeAndTime() {
        let morningArr = []
        let eveningArr = []
        const token = await AsyncStorage.getItem("uid")
        db.ref(`feeders/${token}`).once("value", snapshot => {
            this.state.modeStatus = snapshot.val().autoControl
            // morningArr = snapshot.val().feedTime.morningFeed.split("")
            // eveningArr = snapshot.val().feedTime.eveningFeed.split("")
            // this.state.timeMorning = `0${morningArr[0]}${morningArr[1]}.${morningArr[2]}`
            // this.state.timeEvening = `${eveningArr[0]}${eveningArr[1]}.${eveningArr[2]}${eveningArr[3]}`
            this.state.timeMorning = `0${snapshot.val().feedTime.morningFeed}`
            this.state.timeEvening = snapshot.val().feedTime.eveningFeed
        })
    }

    async statusChange() {
        const token = await AsyncStorage.getItem("uid")
        if (!this.state.modeStatus) {
            this.state.modeStatus = true
            db.ref(`feeders/${token}`).update({
                autoControl: true
            })
        } else {
            this.state.modeStatus = false
            db.ref(`feeders/${token}`).update({
                autoControl: false
            })
        }
    }

    async automaticFeed() {
        const token = await AsyncStorage.getItem("uid")
        db.ref(`feeders/${token}/feedTime`).update({
            morningFeed: Number(this.state.timeMorning.split(":").join("")),
            eveningFeed: Number(this.state.timeEvening.split(":").join(""))
        })
            .then(() => {
                alert("Schedule has been set")
            })
    }

    // _handleDatePicked(time) {
    //     console.log(time, "====")
    //     // console.log("====", Number(time.toLocaleTimeString('it-IT').slice(0, 5).split(":").join("")))
    //     this._hideDateTimePicker();
    //     this.state.timeMorning = time.toLocaleTimeString('it-IT').slice(0, 5)
    // };


    //==================================Profile===================================

    async imagePickerHandler() {
        ImagePicker.showImagePicker({ title: "Pick an image" }, res => {
            if (res.didCancel) {
                alert("canceled")
            } else if (res.error) {
                alert("error")
            } else {
                console.log("uri===", res.uri, "data===", res.data)
                // this.state.profpic = { uri: res.uri }
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
                        this.state.imageUrl = parsedRes.imageUrl
                    })

            }
        })
    }

    async onSubmitProfile(username, email, catName, props) {
        const token = await AsyncStorage.getItem("uid")
        console.log(token)
        db.ref('/users').child(token).set({
            username,
            email,
            catName,
            imageUrl: this.state.imageUrl
        })
            .then(res => {
                console.log("add url")
                props.navigation.navigate('Profile')
            })
    }

    //==============================Notifications.js & CardNotif.js=======================
    async getNotif() {
        const token = await AsyncStorage.getItem("uid")

        db.ref(`feeders/${token}/message`).on("value", snapshot => {
            let arrNotif = []
            let objNotif = {}
            console.log("snapshotNotif==", snapshot.val())
            objNotif = snapshot.val()
            Object.keys(objNotif).map((key, index) => {
                console.log("first", arrNotif)
                arrNotif.push(objNotif[key])
                console.log("second", arrNotif)
            })
            console.log("array==", arrNotif)
            this.state.listNotif = arrNotif.reverse()
            this.state.notifStatus = true
        })
    }

    gotoNotif(props) {
        this.state.notifStatus = false
        props.navigation.navigate('Notifications')

    }

}

export default Store = new mobxStore()
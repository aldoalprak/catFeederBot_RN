import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10
  },
  feedButton: {
    alignSelf: "center",
    marginTop: 15,
    color: "#01AC9A"
  },
  lastFedButton: {
    alignSelf: "center",
    marginTop: 25,
    color: "grey",

  },
  pingButtonRed: {
    borderRadius: 60,
    borderWidth: 1,
    backgroundColor: "red",
    width: 40,
    height: 40,
    margin: 3,
    borderColor: "black",
    borderWidth: 5
  },
  pingButtonGreen: {
    borderRadius: 60,
    borderWidth: 1,
    backgroundColor: "#53f442",
    width: 40,
    height: 40,
    margin: 3,
    borderColor: "black",
    borderWidth: 5
  }
});

export default styles;

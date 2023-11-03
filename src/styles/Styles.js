import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  box_shadow: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});
export default Styles;
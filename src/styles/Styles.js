import { StyleSheet } from "react-native";
import Fonts from "@styles/Fonts";
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
  dropdown: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: "white",
    borderColor: "white",
    width: "50%",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: Fonts.primary,
  },
});
export default Styles;

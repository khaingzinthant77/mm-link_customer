import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import Fonts from "@styles/Fonts";
import ErrorText from "@components/ErrorText";
export default class AYAModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
      name: "",
      phone_no: "",
      ISPHONEERROR: false,
    };
  }
  close() {
    // alert("Hi");
    if (this.props.onClose) {
      this.setState({ phone_no: "", ISPHONEERROR: false });
      this.props.onClose();
    }
  }

  onSubmit() {
    let isError = false;
    if (!this.state.phone_no) {
      this.setState({ ISPHONEERROR: true, editable: true });
      isError = true;
    }
    if (!isError) {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.state.phone_no);
      }
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.closeBtn}>
              <TouchableOpacity
                onPress={() => this.close()}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@images/close-button.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontFamily: Fonts.primary,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {this.props.header_text}
            </Text>

            <View style={styles.entryContainer}>
              {/* <Text style={styles.label}></Text> */}
              <TextInput
                style={styles.input_label}
                value={this.state.phone_no}
                onChangeText={(val) =>
                  this.setState({ phone_no: val, ISPHONEERROR: false })
                }
                keyboardType="phone-pad"
                placeholder="09XXXXXXXXX"
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                autoFocus={true}
              ></TextInput>
              <ErrorText
                errMessage="Please enter your phone number*"
                isShow={this.state.ISPHONEERROR}
              />
            </View>
            <TouchableOpacity
              style={styles.submit_btn}
              onPress={(name, phone_no) => this.onSubmit(name, phone_no)}
            >
              <Text allowFontScaling={false} style={{ color: "white" }}>
                {this.props.btn_text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 350,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  modalimg: {
    width: 55,
    height: 55,
    marginTop: 40,
  },
  showText: {
    textAlign: "center",
    fontSize: 14,
  },
  messageWrapper: {
    padding: 10,
    justifyContent: "center",
    minHeight: 70,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    // backgroundColor: "red",
    top: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  label: {
    // color: "#707070",
    fontSize: 14,
    marginTop: 10,
  },
  input_label: {
    height: 37,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 15,
    // backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  submit_btn: {
    backgroundColor: "#337ab7",
    // width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

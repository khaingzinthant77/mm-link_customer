import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Fonts from "@styles/Fonts";
import ErrorText from "@components/ErrorText";
import Colors from "@styles/Colors";
export default class PasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
      name: "",
      password: this.props.text,
      ISPASSWORDERROR: false,
    };
  }
  componentDidMount = () => {
    this.setState({ password: this.props.text });
  };
  close() {
    if (this.props.onClose) {
      this.setState({ password: "" });
      this.props.onClose();
    }
  }

  onSubmit() {
    // alert(this.state.password)
    let isError = false;
    if (!this.state.password) {
      this.setState({ ISPASSWORDERROR: true, editable: true });
      isError = true;
    }
    if (!isError) {
      if (this.props.onSubmit) {
        this.setState({ password: "" });
        this.props.onSubmit(this.state.password);
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
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 17,
                fontFamily: Fonts.primaryBold,
                marginTop: 10,
                marginBottom: 10,
                color: Colors.theme_color,
              }}
            >
              {this.props.header_text}
            </Text>

            <View style={styles.entryContainer}>
              <TextInput
                style={styles.input_label}
                value={
                  this.state.password ? this.state.password : this.props.text
                }
                onChangeText={(val) =>
                  this.setState({ password: val, ISPASSWORDERROR: false })
                }
                placeholder={
                  !this.props.showPlaceholder == true ? "09XXXXXXXXX" : ""
                }
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                autoFocus={true}
                secureTextEntry={this.props.isPassword ? true : false}
                keyboardType={!this.props.isPassword ? "phone-pad" : null}
              ></TextInput>
              <ErrorText
                errMessage={
                  this.props.err_msg
                    ? this.props.err_msg
                    : "Please enter your phone number*"
                }
                isShow={this.state.ISPASSWORDERROR}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[
                  styles.submit_btn,
                  {
                    borderWidth: 2,
                    borderColor: Colors.theme_color,
                    borderRadius: 5,
                    marginRight: 10,
                  },
                ]}
                onPress={() => this.close()}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: Colors.theme_color }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submit_btn, { backgroundColor: "#337ab7" }]}
                onPress={(name, password) =>
                  this.props.loading ? null : this.onSubmit(name, password)
                }
              >
                <Text allowFontScaling={false} style={{ color: "white" }}>
                  {this.props.btn_text}
                </Text>
              </TouchableOpacity>
            </View>
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
    borderRadius: 20,
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
    // width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
});

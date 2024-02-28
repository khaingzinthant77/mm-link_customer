import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "@styles/Colors";
import { CheckBox, Icon } from "@rneui/themed";
import Styles from "../styles/Styles";
export default class PhoneSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      is_press: false,
      selectedItems: [],
    };
  }
  //   toggleSelection = () => {
  //     this.props.toggleSelection(this.props.data_list);
  //     this.setState((prevState) => ({
  //       isSelected: !prevState.isSelected,
  //       is_press: !prevState.is_press,
  //     }));
  //   };

  toggleSelection = (data) => {
    const { selectedItems } = this.state;
    if (selectedItems.includes(data)) {
      this.setState({
        selectedItems: selectedItems.filter((item) => item !== data),
      });
    } else if (selectedItems.length < this.props.available_slot) {
      this.setState({
        selectedItems: [...selectedItems, data],
      });
    }
  };

  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleAction() {
    if (this.props.onPressConfirm) {
      this.props.onPressConfirm(this.state.selectedItems);
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
            <View style={{ paddingVertical: 10, alignItems: "center" }}>
              <Image
                source={require("@icons/choose.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.theme_color,
                  marginTop: 10,
                }}
              >
                Please select {this.props.available_slot} bonus account
              </Text>
            </View>
            <View style={styles.messageWrapper}>
              {this.props.data_list.map((data, index) => {
                return (
                  <View
                    style={[
                      Styles.box_shadow,
                      { width: 300, backgroundColor: "white" },
                    ]}
                    key={index}
                  >
                    <CheckBox
                      title={data.phone}
                      checked={this.state.selectedItems.includes(data)}
                      onPress={() => this.toggleSelection(data)}
                      iconType="material-community"
                      checkedIcon="checkbox-outline"
                      uncheckedIcon={"checkbox-blank-outline"}
                      size={32}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancleBtn}
                onPress={() => this.close()}
                activeOpacity={0.5}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => this._handleAction()}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
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
    width: "100%",
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
  showText: {
    textAlign: "center",
    fontSize: 15,
  },
  messageWrapper: {
    // padding: 20,
    // justifyContent: "center",
    minHeight: 70,
    // marginTop: 10,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    backgroundColor: "red",
    width: 40,
    height: 40,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  cancleBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#E30D36",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  yesBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#11A84B",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 19,
    color: "#FFFFFF",
  },
});

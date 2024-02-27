import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
//import services
import Fonts from "@styles/Fonts";
//import date Format
import Moment from "moment";
export default class ExpireAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    // console.log(this.props.diff);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          {this.props.diff < 0 ? (
            <View style={styles.modalBody}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                လူကြီးမင်း၏ Site Code သည်
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {Moment(this.props.expiredate).format("DD-MM-Y")}ရက်နေ့တွင် ဘေ
                သက်တမ်းကုန်ဆုံး သွားပါသည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#337ab7",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : this.props.diff == 0 ? (
            <View style={styles.modalBody}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                လူကြီးမင်း၏ Site Code သည်
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {" "}
                ယနေ့ဘေ သက်တမ်းကုန်ဆုံး ပါမည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#337ab7",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : this.props.diff < 3 ? (
            <View style={styles.modalBody}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {" "}
                လူကြီးမင်း၏ Site Code သည်
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: Fonts.primary,
                }}
              >
                {Moment(this.props.expiredate).format("DD-MM-Y")}ရက်နေ့တွင်ဘေ
                သက်တမ်းကုန်ဆုံး ပါမည်။
              </Text>
              <View
                style={{
                  paddingBottom: 10,
                  paddingHorizontal: 80,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#337ab7",
                    height: 40,
                    borderRadius: 5,
                  }}
                  onPress={() => this.close()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: "white", fontSize: 16 }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
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
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    // height: 100,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#337ab7",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  // chooseLangContainer:{
  //     // margin:10,
  //     padding:10
  // },
  myanmarCheck: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  englishCheck: {
    flexDirection: "row",
    padding: 10,
  },
  closeBtn: {
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});

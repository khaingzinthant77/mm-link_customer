import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { ratingApi } from "@apis/FiberApis";
import Fonts from "@styles/Fonts";
//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";
//import component
import SuccessModel from "@components/SuccessModal";
import FiberHeader from "@components/FiberHeader";
import StarRating from "react-native-star-rating-widget";
import SvgIcon from "@images/SvgIcon";
class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
    this.state = {
      data: [],
      locale: null,
      cust_name: null,
      cust_phone: null,
      starCount: 0,
      description: null,
      isOpenSuccessModel: false,
    };
  }
  componentDidMount = async () => {
    initializeLocalization();
  };
  onStarRatingPress(rating) {
    // console.log(rating);
    this.setState({
      starCount: rating,
    });
  }
  _onSaveRating = async () => {
    var self = this;
    if (self.state.starCount == 0) {
      alert("Please Rate Us");
    } else if (self.state.description == null) {
      alert("Please enter description");
    } else {
      let bodyParam = {
        cust_name: self.state.cust_name,
        phone_no: self.state.cust_phone,
        rating_count: self.state.starCount,
        description: self.state.description,
      };

      //   console.log(ratingApi);
      axios
        .post(ratingApi, bodyParam, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          self.setState({
            isOpenSuccessModel: true,
          });
        })
        .catch((err) => {
          console.log("Rating API", err);
          self.setState({ enable: false });
        });
    }
  };

  _handleOnCloseSuccessModel() {
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate("Setting");
  }
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText={t("rating")}
          onPress={() => this.props.navigation.goBack(null)}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 25 }}>
            <SvgIcon
              icon="rating_user"
              width={70}
              height={70}
              style={{ marginTop: 8 }}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Fonts.primary,
                marginBottom: 10,
                fontSize: 16,
                color: "#616161",
              }}
            >
              {this.state.cust_name}
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              ပိုမိုကောင်းမွန်သော ဝန်ဆောင်မှုများကို ရယူဖို့
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              {" "}
              mm-link ရဲ့ ဝန်ဆောင်မှုများကို မှတ်ချက်ပေးနိုင်
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              ပါသည်
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 90, marginTop: 40 }}>
          <StarRating
            rating={this.state.starCount}
            onChange={(rating) => this.onStarRatingPress(rating)}
            disabled={false}
            fullStarColor={"#337ab7"}
            maxStars={5}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            allowFontScaling={false}
            style={styles.costText}
            placeholder="Describe your experience"
            placeholderTextColor="#a4aab0"
            value={this.state.description}
            onChangeText={(value) => this.setState({ description: value })}
          ></TextInput>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => this._onSaveRating()}
          >
            <Text allowFontScaling={false} style={styles.btnText}>
              {t("send", this.state.locale)}
            </Text>
          </TouchableOpacity>
        </View>
        <SuccessModel
          isOpen={this.state.isOpenSuccessModel}
          text={t("thank_rate_us", this.state.locale)}
          onClose={() => this._handleOnCloseSuccessModel()}
        />
      </View>
    );
  }
}
export default withTranslation()(Rating);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  text: {
    textAlignVertical: "center",
    fontSize: 15,
    color: "#1B1F21",
    fontFamily: Fonts.primaryBold,
    fontSize: 16,
    color: "#616161",
  },

  btnContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    margin: 10,
  },
  btn: {
    width: "25%",
    height: 40,
    backgroundColor: "#0079b3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontFamily: Fonts.primary,
  },

  costText: {
    height: 50,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#337ab7",
    // backgroundColor:"#337ab7",
    borderWidth: 2,
    fontSize: 18,
    color: "black",
  },
});

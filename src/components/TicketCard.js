import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { G, Path, Circle, Line, Rect } from "react-native-svg";
export default class TicketCard extends React.Component {
  render() {
    return (
      <View style={styles.conainer}>
        <View
          style={{
            // padding: "5%",
            padding: 15,
            borderRightWidth: 1,
            borderRightColor: "#C3C4C4",
            // backgroundColor:"red",
            justifyContent: "center",
          }}
        >
          {/* <Image source={this.props.img} style={styles.img} /> */}
          {this.props.status == "unsolve" ? (
            <Svg
              id="Service"
              xmlns="http://www.w3.org/2000/svg"
              width="32.756"
              height="32.756"
              viewBox="0 0 32.756 32.756"
            >
              <Path
                id="Path_82"
                data-name="Path 82"
                d="M34.79,13.883l-3.075-3.075-3.679,2.227a11,11,0,0,0-2.026-.843L24.98,8H20.631L19.6,12.179a11,11,0,0,0-2.029.835l-3.69-2.233L10.81,13.855l2.227,3.678a11.007,11.007,0,0,0-.843,2.026L8,20.589v4.348l4.176,1.027a11,11,0,0,0,.835,2.029l-2.234,3.69,3.075,3.075,3.679-2.227a11,11,0,0,0,2.026.843l1.03,4.189H24.94l1.027-4.176A11,11,0,0,0,28,32.552l3.69,2.233,3.075-3.075-2.227-3.678a11.006,11.006,0,0,0,.843-2.026l4.19-1.03V20.629L33.391,19.6a11.009,11.009,0,0,0-.835-2.029Z"
                transform="translate(-7.444 -7.443)"
                fill="#e6e6de"
              />
              <Path
                id="Path_83"
                data-name="Path 83"
                d="M151.577,169.051h4.349l1.027-4.176a11,11,0,0,0,2.029-.835l3.69,2.233,3.075-3.075-2.227-3.678a11.006,11.006,0,0,0,.843-2.026l4.19-1.03v-4.348l-4.176-1.027a11,11,0,0,0-.428-1.18.872.872,0,0,0-1.212-.42l0,0a.877.877,0,0,0-.388,1.121,9.249,9.249,0,0,1,.35.965,1.763,1.763,0,0,0,1.263,1.211l2.843.7v1.6l-2.857.7a1.755,1.755,0,0,0-1.259,1.2,9.267,9.267,0,0,1-.7,1.693,1.756,1.756,0,0,0,.04,1.742l1.516,2.5-1.134,1.134-2.516-1.523a1.751,1.751,0,0,0-1.731-.047,9.275,9.275,0,0,1-1.707.7,1.751,1.751,0,0,0-1.2,1.259l-.7,2.843h-1.6l-.7-2.856a1.762,1.762,0,0,0-1.2-1.261,9.285,9.285,0,0,1-.967-.355.875.875,0,0,0-1.12.383l0,.008a.869.869,0,0,0,.414,1.21,11.014,11.014,0,0,0,1.18.433Z"
                transform="translate(-138.43 -138.931)"
                fill="#fff"
              />
              <Path
                id="Path_84"
                data-name="Path 84"
                d="M17.5,30.68H13.148a.56.56,0,0,1-.544-.426l-.955-3.884a11.6,11.6,0,0,1-1.536-.639L6.7,27.794a.56.56,0,0,1-.686-.083L2.942,24.636a.56.56,0,0,1-.083-.686L4.93,20.528A11.606,11.606,0,0,1,4.3,18.99l-3.87-.951A.56.56,0,0,1,0,17.494V13.146A.56.56,0,0,1,.426,12.6l3.885-.955a11.6,11.6,0,0,1,.639-1.536L2.887,6.7a.56.56,0,0,1,.083-.686L6.045,2.941a.56.56,0,0,1,.686-.083L10.153,4.93A11.588,11.588,0,0,1,11.692,4.3l.951-3.87A.56.56,0,0,1,13.187,0h4.349a.56.56,0,0,1,.544.426l.955,3.884a11.6,11.6,0,0,1,1.536.639L23.98,2.887a.56.56,0,0,1,.686.083l3.075,3.075a.56.56,0,0,1,.083.686l-2.071,3.421a11.616,11.616,0,0,1,.633,1.539l3.87.951a.56.56,0,0,1,.427.544v4.348a.56.56,0,0,1-.427.544l-4.19,1.03A.56.56,0,1,1,25.8,18.02l3.763-.925v-3.47l-3.75-.922a.56.56,0,0,1-.4-.383,10.47,10.47,0,0,0-.793-1.926.56.56,0,0,1,.015-.554l2.006-3.314L24.185,4.072l-3.3,2a.56.56,0,0,1-.556.014,10.466,10.466,0,0,0-1.923-.8.56.56,0,0,1-.381-.4L17.1,1.12h-3.47L12.7,4.87a.56.56,0,0,1-.384.4,10.462,10.462,0,0,0-1.926.793.56.56,0,0,1-.554-.015L6.527,4.044,4.073,6.5l2,3.3a.56.56,0,0,1,.014.556,10.463,10.463,0,0,0-.8,1.922.56.56,0,0,1-.4.381l-3.763.925v3.47l3.75.922a.56.56,0,0,1,.4.383,10.457,10.457,0,0,0,.793,1.926.56.56,0,0,1-.015.554L4.045,24.154,6.5,26.608l3.3-2a.56.56,0,0,1,.556-.014,10.47,10.47,0,0,0,1.923.8.56.56,0,0,1,.381.4l.925,3.763h3.47l.922-3.749a.56.56,0,0,1,1.088.268L18.04,30.254A.56.56,0,0,1,17.5,30.68Z"
                fill="#333"
              />
              <Path
                id="Path_85"
                data-name="Path 85"
                d="M139.423,129.991a6.373,6.373,0,0,0-6.344-1.6l3.892,3.891-4.294,4.294L128.8,132.7a6.375,6.375,0,0,0,7.911,7.91l9.864,9.863a3.037,3.037,0,0,0,4.294,0h0a3.036,3.036,0,0,0,0-4.294l-9.849-9.848A6.371,6.371,0,0,0,139.423,129.991Z"
                transform="translate(-119.546 -119.157)"
                fill="#fcd259"
              />
              <Path
                id="Path_86"
                data-name="Path 86"
                d="M197.465,130.073l-1.927-1.927a6.4,6.4,0,0,0-2.192.259l2.894,2.893a.867.867,0,0,0,1.225,0h0A.866.866,0,0,0,197.465,130.073Z"
                transform="translate(-179.814 -119.168)"
                fill="#fff"
              />
              <Path
                id="Path_87"
                data-name="Path 87"
                d="M151.709,209.7h0a3.037,3.037,0,0,1-4.294,0l-9.578-9.577a.7.7,0,0,0-.649-.192,6.372,6.372,0,0,1-7.79-5.8l-.6-.6a6.375,6.375,0,0,0,7.911,7.91l9.864,9.863a3.037,3.037,0,0,0,4.294,0C151.285,210.879,151.357,210.061,151.709,209.7Z"
                transform="translate(-119.546 -179.996)"
                fill="#f3c229"
              />
              <Path
                id="Path_88"
                data-name="Path 88"
                d="M359.531,364.161a.574.574,0,0,1-.4-.956l4.294-4.294a.56.56,0,0,1,.792.792L359.927,364A.558.558,0,0,1,359.531,364.161Z"
                transform="translate(-333.859 -333.638)"
                fill="#fff"
              />
              <Path
                id="Path_89"
                data-name="Path 89"
                d="M138.726,143.413l-9.636-9.635a6.935,6.935,0,0,1-8.281-8.691.568.568,0,0,1,.934-.239l3.48,3.48,3.5-3.5-3.5-3.495a.568.568,0,0,1,.235-.933,6.93,6.93,0,0,1,6.9,1.737h0a6.928,6.928,0,0,1,1.827,6.574l9.619,9.618a3.6,3.6,0,1,1-5.087,5.086Zm-9.072-10.655,9.864,9.863a2.476,2.476,0,1,0,3.5-3.5l-9.849-9.848a.56.56,0,0,1-.14-.557,5.81,5.81,0,0,0-1.456-5.787h0a5.808,5.808,0,0,0-4.823-1.659l3.162,3.161a.56.56,0,0,1,0,.792l-4.294,4.294a.56.56,0,0,1-.792,0l-3.139-3.139a5.814,5.814,0,0,0,7.413,6.24A.492.492,0,0,1,129.654,132.758Z"
                transform="translate(-112.094 -111.698)"
                fill="#333"
              />
            </Svg>
          ) : (
            <Svg
              id="Service"
              xmlns="http://www.w3.org/2000/svg"
              width="32.756"
              height="32.756"
              viewBox="0 0 32.756 32.756"
            >
              <Path
                id="Path_82"
                data-name="Path 82"
                d="M34.79,13.883l-3.075-3.075-3.679,2.227a11,11,0,0,0-2.026-.843L24.98,8H20.631L19.6,12.179a11,11,0,0,0-2.029.835l-3.69-2.233L10.81,13.855l2.227,3.678a11.007,11.007,0,0,0-.843,2.026L8,20.589v4.348l4.176,1.027a11,11,0,0,0,.835,2.029l-2.234,3.69,3.075,3.075,3.679-2.227a11,11,0,0,0,2.026.843l1.03,4.189H24.94l1.027-4.176A11,11,0,0,0,28,32.552l3.69,2.233,3.075-3.075-2.227-3.678a11.006,11.006,0,0,0,.843-2.026l4.19-1.03V20.629L33.391,19.6a11.009,11.009,0,0,0-.835-2.029Z"
                transform="translate(-7.444 -7.443)"
                fill="#e6e6de"
              />
              <Path
                id="Path_83"
                data-name="Path 83"
                d="M151.577,169.051h4.349l1.027-4.176a11,11,0,0,0,2.029-.835l3.69,2.233,3.075-3.075-2.227-3.678a11.006,11.006,0,0,0,.843-2.026l4.19-1.03v-4.348l-4.176-1.027a11,11,0,0,0-.428-1.18.872.872,0,0,0-1.212-.42l0,0a.877.877,0,0,0-.388,1.121,9.249,9.249,0,0,1,.35.965,1.763,1.763,0,0,0,1.263,1.211l2.843.7v1.6l-2.857.7a1.755,1.755,0,0,0-1.259,1.2,9.267,9.267,0,0,1-.7,1.693,1.756,1.756,0,0,0,.04,1.742l1.516,2.5-1.134,1.134-2.516-1.523a1.751,1.751,0,0,0-1.731-.047,9.275,9.275,0,0,1-1.707.7,1.751,1.751,0,0,0-1.2,1.259l-.7,2.843h-1.6l-.7-2.856a1.762,1.762,0,0,0-1.2-1.261,9.285,9.285,0,0,1-.967-.355.875.875,0,0,0-1.12.383l0,.008a.869.869,0,0,0,.414,1.21,11.014,11.014,0,0,0,1.18.433Z"
                transform="translate(-138.43 -138.931)"
                fill="#fff"
              />
              <Path
                id="Path_84"
                data-name="Path 84"
                d="M17.5,30.68H13.148a.56.56,0,0,1-.544-.426l-.955-3.884a11.6,11.6,0,0,1-1.536-.639L6.7,27.794a.56.56,0,0,1-.686-.083L2.942,24.636a.56.56,0,0,1-.083-.686L4.93,20.528A11.606,11.606,0,0,1,4.3,18.99l-3.87-.951A.56.56,0,0,1,0,17.494V13.146A.56.56,0,0,1,.426,12.6l3.885-.955a11.6,11.6,0,0,1,.639-1.536L2.887,6.7a.56.56,0,0,1,.083-.686L6.045,2.941a.56.56,0,0,1,.686-.083L10.153,4.93A11.588,11.588,0,0,1,11.692,4.3l.951-3.87A.56.56,0,0,1,13.187,0h4.349a.56.56,0,0,1,.544.426l.955,3.884a11.6,11.6,0,0,1,1.536.639L23.98,2.887a.56.56,0,0,1,.686.083l3.075,3.075a.56.56,0,0,1,.083.686l-2.071,3.421a11.616,11.616,0,0,1,.633,1.539l3.87.951a.56.56,0,0,1,.427.544v4.348a.56.56,0,0,1-.427.544l-4.19,1.03A.56.56,0,1,1,25.8,18.02l3.763-.925v-3.47l-3.75-.922a.56.56,0,0,1-.4-.383,10.47,10.47,0,0,0-.793-1.926.56.56,0,0,1,.015-.554l2.006-3.314L24.185,4.072l-3.3,2a.56.56,0,0,1-.556.014,10.466,10.466,0,0,0-1.923-.8.56.56,0,0,1-.381-.4L17.1,1.12h-3.47L12.7,4.87a.56.56,0,0,1-.384.4,10.462,10.462,0,0,0-1.926.793.56.56,0,0,1-.554-.015L6.527,4.044,4.073,6.5l2,3.3a.56.56,0,0,1,.014.556,10.463,10.463,0,0,0-.8,1.922.56.56,0,0,1-.4.381l-3.763.925v3.47l3.75.922a.56.56,0,0,1,.4.383,10.457,10.457,0,0,0,.793,1.926.56.56,0,0,1-.015.554L4.045,24.154,6.5,26.608l3.3-2a.56.56,0,0,1,.556-.014,10.47,10.47,0,0,0,1.923.8.56.56,0,0,1,.381.4l.925,3.763h3.47l.922-3.749a.56.56,0,0,1,1.088.268L18.04,30.254A.56.56,0,0,1,17.5,30.68Z"
                fill="#333"
              />
              <Path
                id="Path_85"
                data-name="Path 85"
                d="M139.423,129.991a6.373,6.373,0,0,0-6.344-1.6l3.892,3.891-4.294,4.294L128.8,132.7a6.375,6.375,0,0,0,7.911,7.91l9.864,9.863a3.037,3.037,0,0,0,4.294,0h0a3.036,3.036,0,0,0,0-4.294l-9.849-9.848A6.371,6.371,0,0,0,139.423,129.991Z"
                transform="translate(-119.546 -119.157)"
                fill="#00FF00"
              />
              <Path
                id="Path_86"
                data-name="Path 86"
                d="M197.465,130.073l-1.927-1.927a6.4,6.4,0,0,0-2.192.259l2.894,2.893a.867.867,0,0,0,1.225,0h0A.866.866,0,0,0,197.465,130.073Z"
                transform="translate(-179.814 -119.168)"
                fill="#fff"
              />
              <Path
                id="Path_87"
                data-name="Path 87"
                d="M151.709,209.7h0a3.037,3.037,0,0,1-4.294,0l-9.578-9.577a.7.7,0,0,0-.649-.192,6.372,6.372,0,0,1-7.79-5.8l-.6-.6a6.375,6.375,0,0,0,7.911,7.91l9.864,9.863a3.037,3.037,0,0,0,4.294,0C151.285,210.879,151.357,210.061,151.709,209.7Z"
                transform="translate(-119.546 -179.996)"
                fill="#00FF00"
              />
              <Path
                id="Path_88"
                data-name="Path 88"
                d="M359.531,364.161a.574.574,0,0,1-.4-.956l4.294-4.294a.56.56,0,0,1,.792.792L359.927,364A.558.558,0,0,1,359.531,364.161Z"
                transform="translate(-333.859 -333.638)"
                fill="#fff"
              />
              <Path
                id="Path_89"
                data-name="Path 89"
                d="M138.726,143.413l-9.636-9.635a6.935,6.935,0,0,1-8.281-8.691.568.568,0,0,1,.934-.239l3.48,3.48,3.5-3.5-3.5-3.495a.568.568,0,0,1,.235-.933,6.93,6.93,0,0,1,6.9,1.737h0a6.928,6.928,0,0,1,1.827,6.574l9.619,9.618a3.6,3.6,0,1,1-5.087,5.086Zm-9.072-10.655,9.864,9.863a2.476,2.476,0,1,0,3.5-3.5l-9.849-9.848a.56.56,0,0,1-.14-.557,5.81,5.81,0,0,0-1.456-5.787h0a5.808,5.808,0,0,0-4.823-1.659l3.162,3.161a.56.56,0,0,1,0,.792l-4.294,4.294a.56.56,0,0,1-.792,0l-3.139-3.139a5.814,5.814,0,0,0,7.413,6.24A.492.492,0,0,1,129.654,132.758Z"
                transform="translate(-112.094 -111.698)"
                fill="#333"
              />
            </Svg>
          )}
        </View>
        <View style={{ justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <View style={{ paddingLeft: 5, marginRight: 10 }}>
              <Image
                source={require("@icons/calender.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
            <Text allowFontScaling={false}>{this.props.date}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 8,
              alignItems: "center",
            }}
          >
            <View style={{ paddingLeft: 5, marginRight: 10 }}>
              <Image
                source={require("@icons/invoice.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
            <Text allowFontScaling={false}>{this.props.issue}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 8,
              paddingBottom: 8,
              alignItems: "center",
            }}
          >
            <View style={{ paddingLeft: 5, marginRight: 10 }}>
              <Image
                source={require("@icons/invoice.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
            <Text allowFontScaling={false} numberOfLines={1}>
              {this.props.problem != null
                ? this.props.problem.length > 10
                  ? this.props.problem.substring(0, 30) + "..."
                  : this.props.problem
                : null}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  headering: {
    height: null,
    backgroundColor: "orange",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  nextHeaderText: {
    color: "#707070",
    fontSize: 14,
    // marginTop: 10,
  },
});

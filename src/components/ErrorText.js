import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorText = ({ isShow, errMessage }) => {
  return (
    <Text allowFontScaling={false} style={styles.errText}>
      {isShow ? errMessage : ""}
    </Text>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  errText: {
    color: "red",
    fontSize: 14,
    marginLeft: 5,
  },
});

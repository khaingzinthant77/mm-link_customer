import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";
//import style
import Colors from "@styles/Colors";
const LanguageModal = ({ changeLangMM, changeLangEN, onClose, isOpen }) => {
  const [mmCheck, setMMCheck] = useState(false);
  const [enCheck, setENCheck] = useState(false);
  useEffect(() => {
    fetchData();
    initializeLocalization();
  }, []);
  const { t } = useTranslation();
  fetchData = async () => {
    const res = await AsyncStorage.getItem("language");
    if (res == "mm") {
      setMMCheck(true);
    } else {
      setENCheck(true);
    }
  };

  _handleChangeMMLanguage = (value) => {
    if (changeLangMM(value)) {
      changeLangMM(value);
      setMMCheck(true);
      setENCheck(false);
    }
  };

  _handleChangeENLanguage = (value) => {
    if (changeLangEN(value)) {
      changeLangEN(value);
      setENCheck(true);
      setMMCheck(false);
    }
  };

  close = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View
            style={{
              backgroundColor: Colors.theme_color,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              {t("choose_language")}
            </Text>
          </View>
          <View style={styles.chooseLangContainer}>
            <TouchableOpacity
              style={[
                styles.myanmarCheck,
                mmCheck
                  ? { backgroundColor: "#E0E0E0" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => _handleChangeMMLanguage(mmCheck)}
            >
              <Image
                source={require("@images/lang/myanmar.png")}
                style={styles.modalimg}
              />
              <Text style={{ marginTop: 10, marginLeft: 10 }}>
                {t("mminput")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.myanmarCheck,
                enCheck
                  ? { backgroundColor: "#E0E0E0" }
                  : { backgroundColor: "white" },
              ]}
              onPress={() => _handleChangeENLanguage(enCheck)}
            >
              <Image
                source={require("@images/lang/english.png")}
                style={styles.modalimg}
              />
              <Text style={{ marginTop: 10, marginLeft: 10 }}>
                {t("enginput")}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderTopColor: "#E0E0E0",
                borderWidth: 1,
                borderStyle: "solid",
                backgroundColor: "white",
              }}
            ></View>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                padding: 10,
              }}
              onPress={() => this.close()}
            >
              <Text
                style={{ fontSize: 16, color: "#337ab7", fontWeight: "bold" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

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
    height: null,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
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

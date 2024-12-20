import React from "react";
import { StyleSheet, View } from "react-native";

const Spacer = ({ children }) => {
  return <View style={style.inputPadding}>{children}</View>;
};

const style = StyleSheet.create({
  inputPadding: {
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
  },
});
export default Spacer;

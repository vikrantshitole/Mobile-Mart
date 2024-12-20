import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import AuthForm from "../components/AuthForm/AuthForm";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Signup = () => {
  const inset2 = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingLeft: inset2.left,
        paddingRight: inset2.right,
        paddingTop: inset2.top,
        paddingBottom: inset2.bottom,
        flex: 1,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <AuthForm
        title="Sign Up To Mobile Mart"
        route="signin"
        buttonText="Sign Up"
        alreadyHaveAccountText="Already have an account? Please Sign In!"
      />
    </View>
  );
};

export default Signup;

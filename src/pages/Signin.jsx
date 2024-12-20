import { Text } from "@rneui/themed";
import React from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AuthForm from "../components/AuthForm/AuthForm";
import { View } from "react-native";

const Signin = () => {
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
        title="Sign In To Mobile Mart"
        route="signup"
        buttonText="Sign In"
        alreadyHaveAccountText="Don't have an account? Please Sign Up!"
      />
    </View>
  );
};

export default Signin;

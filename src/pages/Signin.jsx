import { Text } from "@rneui/themed";
import React from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AuthForm from "../components/AuthForm/AuthForm";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { signin } from "../redux/actions/authAction";
import api from "../api/axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const inset2 = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const login = async(username,password) => {
    try {
      
      const response = await api.post('/signin',{username,password});
      
      await AsyncStorage.setItem('token', response.data.token)
      dispatch(signin(username,response.data.token,response.data.user))      
      navigation.navigate('main')
    } catch (error) {
            
    }

  }
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
        onClick={login}
      />
    </View>
  );
};

export default Signin;

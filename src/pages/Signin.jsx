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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const login = async(username,password) => {
    try {
      console.log("login");
      
      const response = await api.post('/signin',{username,password});      
      await AsyncStorage.setItem('token', response.data.token)
      dispatch(signin(response.data.token,response.data.user))      
      navigation.navigate('main')
    } catch (error) {
            console.log(error.message);
            console.log(JSON.stringify(error));
            
    }

  }
  return (
    <SafeAreaProvider>
      <AuthForm
        title="Sign In To Mobile Mart"
        route="signup"
        buttonText="Sign In"
        alreadyHaveAccountText="Don't have an account? Please Sign Up!"
        onClick={login}
      />
    </SafeAreaProvider>
  );
};

export default Signin;

import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { View } from "react-native";
import AuthForm from "../components/AuthForm/AuthForm";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authAction";
import api from "../api/axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const inset2 = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const register = async(username, password, firstName, lastName) => {
    try {
      
      const res = await api.post('/signup', {username,password,firstName,lastName});
      await AsyncStorage.setItem('token', res.data.token)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(signup( res.data.token,res.data.user));
      navigation.navigate('main')
    } catch (error) {
      console.log(JSON.stringify(error));
      
    }
  }
  const mount = async() => {
    const token =await AsyncStorage.getItem('token');
    let user = await AsyncStorage.getItem('user')
    user = user ? JSON.parse(user):null
    const getUserInfo= async() => {
      if (!user) {
       let res = await api.get('/me')     
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
      user = res.data.user
     }
     dispatch(signup( token,user));
    }
    if (token) {
      getUserInfo()
      navigation.navigate('main')
    }
  }
  useEffect(() => {
    mount()
  },[])
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
        onClick={register}
      />
    </View>
  );
};

export default Signup;

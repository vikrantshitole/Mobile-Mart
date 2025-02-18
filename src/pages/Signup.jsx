import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { View } from "react-native";
import AuthForm from "../components/AuthForm/AuthForm";
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authAction";
import api from "../api/axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  // const inset2 = useSafeAreaInsets();
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
      throw JSON.stringify(new Error('Signup failed!'))
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
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert('Biometric record not found', 'Please ensure you have set up biometrics on your device.');
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      Alert.alert('Authenticated', 'You have been successfully authenticated!');
    } else {
      Alert.alert('Authentication failed', 'Please try again.');
    }
  };

  return (
    <SafeAreaProvider 
      >
      <AuthForm
        title="Sign Up To Mobile Mart"
        route="signin"
        buttonText="Sign Up"
        alreadyHaveAccountText="Already have an account? Please Sign In!"
        onClick={register}
      />
    </SafeAreaProvider>
  );
};

export default Signup;

import {
  Button,
  Image,
  Input,
  makeStyles,
  Text,
  ThemeConsumer,
  useTheme,
} from "@rneui/themed";
import React, { useEffect, useState } from "react";
import Spacer from "../Spacer/Spacer";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthData, { CHANGE_INPUT } from "../../hooks/useAuthData";
const ERROR  = {
  emailOrNumber: {
      message:"",
      error: false
  },
  firstName: {
      message:"",
      error: false
  },
  lastName: {
      message:"",
      error: false
  },
  password: {
      message:"",
      error: false
  },
  password: {
      message:"",
      error: false
  },
  confirmPassword: {
      message:"",
      error: false
  },
}

const AuthForm = ({
  title = "",
  buttonText,
  route = "",
  alreadyHaveAccountText,
  onClick
}) => {
  const { theme } = useTheme();
  const style = useStyles(theme);
  const navigation = useNavigation();
  const [state, dispatch] = useAuthData();
  const [error, setError ] = useState(ERROR);

  const navigateTo = () => {
    navigation.navigate(route);
  };

  const changeInput = (name, value) => {

    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
    setError((prevState) => ({
      ...prevState,
      [name] : {
        message: "",
        error: false
      }
    }))
  }

  const validation = () => {
    const {emailOrNumber,password,confirmPassword,firstName,lastName,isLoginWithNumber,isSignUp} = state;
    const err = JSON.parse(JSON.stringify(error))
    let valid = true;

    if (!emailOrNumber || !emailOrNumber.length) {
        err.emailOrNumber.message = isLoginWithNumber ?  "Please enter mobile number" : "Please enter email"
        err.emailOrNumber.error= true;
        valid = false
    }
    else if (emailOrNumber && emailOrNumber.length) {
      if (isLoginWithNumber) {
        const regex = /^[6-9]\d{9}$/;
        if (emailOrNumber && emailOrNumber.length !== 10) {
          err.emailOrNumber.message = "Mobile number should be 10 digits."
          err.emailOrNumber.error= true;
          valid = false
        }else if (!regex.test(emailOrNumber)) {
          err.emailOrNumber.message = "Please enter valid mobile number."
          err.emailOrNumber.error= true;
          valid = false
        }
      }else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailOrNumber)) {
          err.emailOrNumber.message = "Please enter valid email."
          err.emailOrNumber.error= true;
          valid = false
        }
      }
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      err.password.message = 'Please enter password';
      err.password.error = true;
      valid = true;
    }else  if (isSignUp && !passwordRegex.test(password)){
      err.password.message = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
      err.password.error = true;
      valid = true;
    }

    if (isSignUp && !confirmPassword) {
      err.confirmPassword.message = 'Please enter password';
      err.confirmPassword.error = true;
      valid = true;
    }else if (isSignUp && confirmPassword !== password){
      err.confirmPassword.message = 'Confirm password should be same as that of password.';
      err.confirmPassword.error = true;
      valid = true;
    }

    if (isSignUp && !firstName) {
      err.firstName.message = "Please enter first name.";
      err.firstName.error = true;
      valid = false;
    }

    if (isSignUp && !lastName) {
      err.lastName.message = "Please enter last name.";
      err.lastName.error = true;
      valid = false
    }

    setError(error)
    return valid
  }
  useEffect(() => {
    dispatch({ type: CHANGE_INPUT, payload: { name: 'isSignUp', value: buttonText === 'Sign Up' } })
  }, [buttonText])

  return (
    <>
      <Spacer>
        <Image
          source={require("../../assets/logo.png")}
          alt="logo"
          style={{
            width: "auto",
            height: "100",
            alignItems: "center",
            objectFit: "contain",
          }}
          width={50}
          height={50}
        />
      </Spacer>
      <Spacer>
        <View style={{ alignItems: "center" }}>
          <Text h3>{title}</Text>
        </View>
      </Spacer>
      <Spacer>
        <Input
          placeholder={state.isLoginWithNumber ? "8855824455" : "email@address.com"}
          leftIcon={{
            type: state.isLoginWithNumber ? "font-awesome" : "fontisto",
            name: state.isLoginWithNumber ? "phone" : "email",
          }}
          label={<Text>{state.isLoginWithNumber ? "Mobile Number" : "Email"}</Text>}
          value={state.emailOrNumber}
          keyboardType={state.isLoginWithNumber ? "numeric" : "email-address"}
          inputMode={state.isLoginWithNumber ? "numeric" : "email"}
          onChangeText={(value) => changeInput("emailOrNumber", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      {
        state.isSignUp &&
        <Spacer>
          <Input
            placeholder={'XYZ...'}
            label={<Text>First Name</Text>}
            value={state.firstName}
            name="firstName"
            onChangeText={(value) => changeInput("firstName", value)}
            renderErrorMessage={error.firstName.error}
          />
        </Spacer>
      }
      {
        state.isSignUp &&
        <Spacer>
          <Input
            placeholder={"PQR..."}
            label={<Text>Last Name</Text>}
            value={state.lastName}
            name="lastName"
            renderErrorMessage={error.lastName.error}
            onChangeText={(value) => changeInput("lastName", value)}
          />
        </Spacer>

      }


      <Spacer>
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label={<Text>Password</Text>}
          renderErrorMessage={error.password.error}
          value={state.password}
          name="password"
          onChangeText={(value) => changeInput("password", value)}
        />
      </Spacer>
      {
        state.isSignUp &&
        <Spacer>
          <Input
            placeholder="Password"
            secureTextEntry
            leftIcon={{ type: "font-awesome", name: "lock" }}
            label={<Text>Confirm Password</Text>}
            renderErrorMessage={error.confirmPassword.error}
            value={state.confirmPassword}
            name="confirmPassword"
            onChangeText={(value) => changeInput("confirmPassword", value)}
          />
        </Spacer>
      }
      <TouchableOpacity style={style.alreadySignInButton} onPress={navigateTo}>
        <Text style={{ color: theme.colors.secondary }}>
          {alreadyHaveAccountText}
        </Text>
      </TouchableOpacity>
      <Spacer>
        <Button title={buttonText} onPress={() => validation() && onClick(state.emailOrNumber, state.password, state.firstName, state.lastName)} />
      </Spacer>

      <TouchableOpacity
        style={{ ...style.alreadySignInButton, ...style.emailOrMobileLogin }}
        onPress={() =>
          dispatch({ type: CHANGE_INPUT, payload: { name: 'isLoginWithNumber', value: !state.isLoginWithNumber } })
        }
      >
        <Text style={{ color: theme.colors.secondary }}>
          {buttonText} with {state.isLoginWithNumber ? "Email" : "Mobile Number"}
        </Text>
      </TouchableOpacity>
    </>
  );
};
const useStyles = makeStyles((theme, props) => ({
  alreadySignInButton: {
    marginStart: 20,
    marginEnd: 10,
    marginBottom: 10,
  },
  emailOrMobileLogin: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default AuthForm;

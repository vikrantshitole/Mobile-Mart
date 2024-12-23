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

  const navigateTo = () => {
    navigation.navigate(route);
  };

  const changeInput = (e) => {
    dispatch({ type: CHANGE_INPUT, payload: { name: e.target.name, value: e.target.value } })
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
          name="emailOrNumber"
          keyboardType={state.isLoginWithNumber ? "numeric" : "email-address"}
          inputMode={state.isLoginWithNumber ? "numeric" : "email"}
          onChange={changeInput}
          renderErrorMessage={state.error.emailOrNumber.error}
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
            onChange={changeInput}
            renderErrorMessage={state.error.firstName.error}
          />
        </Spacer>
      }
      {
        buttonText === 'Sign Up' &&
        <Spacer>
          <Input
            placeholder={"PQR..."}
            label={<Text>Last Name</Text>}
            value={state.lastName}
            name="lastName"
            renderErrorMessage={state.error.lastName.error}
            onChange={changeInput}
          />
        </Spacer>

      }


      <Spacer>
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label={<Text>Password</Text>}
          renderErrorMessage={state.error.password.error}
          value={state.password}
          name="password"
          onChange={changeInput}
        />
      </Spacer>
      {
        buttonText === 'Sign Up' &&
        <Spacer>
          <Input
            placeholder="Password"
            secureTextEntry
            leftIcon={{ type: "font-awesome", name: "lock" }}
            label={<Text>Confirm Password</Text>}
            renderErrorMessage={state.error.confirmPassword.error}
            value={state.confirmPassword}
            name="confirmPassword"
            onChange={changeInput}
          />
        </Spacer>
      }
      <TouchableOpacity style={style.alreadySignInButton} onPress={navigateTo}>
        <Text style={{ color: theme.colors.secondary }}>
          {alreadyHaveAccountText}
        </Text>
      </TouchableOpacity>
      <Spacer>
        <Button title={buttonText} onPress={() => onClick(state.emailOrNumber, state.password, state.firstName, state.lastName)} />
      </Spacer>

      <TouchableOpacity
        style={{ ...style.alreadySignInButton, ...style.emailOrMobileLogin }}
        onPress={() =>
          dispatch({ type: CHANGE_INPUT, password: { name: 'isLoginWithNumber', value: !state.isLoginWithNumber } })
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

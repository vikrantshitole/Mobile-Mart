import {
  Button,
  Image,
  Input,
  makeStyles,
  Text,
  ThemeConsumer,
  useTheme,
} from "@rneui/themed";
import React, { useState } from "react";
import Spacer from "../Spacer/Spacer";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AuthForm = ({
  title = "",
  buttonText,
  route = "",
  alreadyHaveAccountText,
  emailOrMobileLogin = "Login with Mobile Number",
}) => {
  const { theme } = useTheme();
  const style = useStyles(theme);
  const navigation = useNavigation();
  const [emailOrNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginWithNumber, setIsLoginWithNumber] = useState(false);
  const [email, setEmail] = useState("");
  const navigateTo = () => {
    navigation.navigate(route);
  };
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
          placeholder={isLoginWithNumber ? "8855824455" : "email@address.com"}
          leftIcon={{
            type: isLoginWithNumber ? "font-awesome" : "fontisto",
            name: isLoginWithNumber ? "phone" : "email",
          }}
          label={<Text>{isLoginWithNumber ? "Mobile Number" : "Email"}</Text>}
          value={emailOrNumber}
          keyboardType={isLoginWithNumber ? "numeric" : "email-address"}
          inputMode={isLoginWithNumber ? "numeric" : "email"}
          onChangeText={setEmailOrPhoneNumber}
        />
      </Spacer>

      <Spacer>
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label={<Text>Password</Text>}
          renderErrorMessage={false}
          value={password}
          onChangeText={setPassword}
        />
      </Spacer>
      <TouchableOpacity style={style.alreadySignInButton} onPress={navigateTo}>
        <Text style={{ color: theme.colors.secondary }}>
          {alreadyHaveAccountText}
        </Text>
      </TouchableOpacity>
      <Spacer>
        <Button title={buttonText} />
      </Spacer>

      <TouchableOpacity
        style={{ ...style.alreadySignInButton, ...style.emailOrMobileLogin }}
        onPress={() =>
          setIsLoginWithNumber((isLoginWithNumber) => !isLoginWithNumber)
        }
      >
        <Text style={{ color: theme.colors.secondary }}>
          {buttonText} with {isLoginWithNumber ? "Email" : "Mobile Number"}
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import CreateAddressPage from "./src/pages/CreateAddressPage";
import UpdateAddressPage from "./src/pages/UpdateAddressPage";
import Cart from "./src/pages/Cart";
import Signup from "./src/pages/Signup";
import Signin from "./src/pages/Signin";
import MartListPage from "./src/pages/MartListPage";
import DetailItemPage from "./src/pages/DetailItemPage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createTheme,
  darkColors,
  lightColors,
  ThemeProvider,
  useTheme,
} from "@rneui/themed";
import { createStore } from "redux";
import reducer from "./src/redux";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountPage from "./src/pages/AccountPage";
import { navigationRef } from "./src/utils/navigatorRef";
import CartIcon from "./src/components/CartIcon/CartIcon";
import useNotification from "./src/hooks/useNotification";
import AddressListPage from "./src/pages/AddressListPage";
import * as Notification from 'expo-notifications'
// useNotification()
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as LocalAuthentication from 'expo-local-authentication';


Notification.setNotificationHandler({
    handleNotification: async() => {
      return{
        shouldShowAlert:true,
        shouldSetBadge: false,
        shouldPlaySound: true
      }
    }
})
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AddressRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen name="address" component={AddressListPage} />
    <Stack.Screen name="create-address" component={CreateAddressPage} options={{headerTitle: "Create Address", headerTitleAlign: "Center"}}/>
    <Stack.Screen name="update-address" component={UpdateAddressPage} options={{headerTitle: "Update Address", headerTitleAlign: 'center'}}/>
  </Stack.Navigator>
);

const CartRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="cart" component={Cart} />
    <Stack.Screen name="address-page" component={AddressRoutes}  options={{headerShown: false}}/>
  </Stack.Navigator>
);

const AuthRoute = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="signup"
      component={Signup}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="signin"
      component={Signin}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ItemRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="list" component={MartListPage} options={{headerTitle: "Mart Mobile", headerTitleAlign: 'center', headerRight:() => <CartIcon /> }} />
    <Stack.Screen name="detail" component={DetailItemPage} options={{ headerTitleAlign: 'center', headerRight:() => <CartIcon />}}/>
  </Stack.Navigator>
);

const MartAndCartRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="mart" component={ItemRoute} options={{headerShown: false}} />
    <Stack.Screen name="cart-page" component={CartRoute} options={{headerShown: false}} />
  </Stack.Navigator>
);
const MainFlowRoute = ( ) => (
  <Tab.Navigator>
    <Tab.Screen name="home"  component={MartAndCartRoute} options={{headerShown: false, tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />}}/>
    <Tab.Screen name="setting" component={AccountPage} options={{headerShown: false, tabBarIcon: () => <Ionicons name="settings" size={24} color="black" />}}/>
  </Tab.Navigator>
)

const AppRoute = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="auth"
      component={AuthRoute}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="main" component={MainFlowRoute} options={{headerShown: false}} />
  </Stack.Navigator>
);
const themeSettings = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: lightColors.primary,
    background: lightColors.background,
  },
  mode: "light",
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
    primary: darkColors.primary,
    background: darkColors.background,
  },
});
const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const Navigation = () => {
  const { theme } = useTheme();
console.log(theme.mode, lightColors.background,darkColors.background);

  if (!theme) {
    return null;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.white,
          text: theme.colors.black,
        },

        dark: theme.mode === "dark",
        fonts: Platform.select({
          android: {
            regular: {
              fontFamily: "sans-serif",
              fontWeight: 400,
            },
          },
          default: {
            regular: {
              fontFamily: "sans-serif",
              fontWeight: "normal",
            },
            medium: {
              fontFamily: "sans-serif-medium",
              fontWeight: "normal",
            },
            bold: {
              fontFamily: "sans-serif",
              fontWeight: "600",
            },
            heavy: {
              fontFamily: "sans-serif",
              fontWeight: "700",
            },
          },
        }),
      }}
    >
      <AppRoute />
    </NavigationContainer>
  );
};
const store = createStore(reducer)
const App = () => {
  const [isRooted, setIsRooted] = useState(false);

  useEffect(() => {
    (async () => {
      const rooted = await Device.isRootedAsync();
      setIsRooted(rooted);
      if (rooted) {
        Alert.alert('Warning', 'This device is rooted or jailbroken.');
      }
    })();
  }, []);
  return (
    <>
    
    {
      isRooted ? <Text> Device is Rooted </Text>:
    (<Provider store={store}>
      <ThemeProvider theme={themeSettings}>
        <Navigation />
      </ThemeProvider>
    </Provider>)
    }
    </>
  );
};

export default App;

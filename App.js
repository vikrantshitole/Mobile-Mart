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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AddressRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen name="address" component={AddressPage} />
    <Stack.Screen name="create-address" component={CreateAddressPage} />
    <Stack.Screen name="update-address" component={UpdateAddressPage} />
  </Stack.Navigator>
);

const CartRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="cart" component={Cart} />
    <Stack.Screen name="address" component={AddressRoutes} />
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
    <Stack.Screen name="list" component={MartListPage} options={{headerTitle: "Mart Mobile", headerTitleAlign: 'center'}} />
    <Stack.Screen name="detail" component={DetailItemPage} />
  </Stack.Navigator>
);

const MartAndCartRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="mart" component={ItemRoute} options={{headerShown: false}} />
    <Stack.Screen name="cart" component={CartRoute} options={{headerShown: false}} />
  </Stack.Navigator>
);
const MainFlowRoute = ( ) => (
  <Tab.Navigator>
    <Tab.Screen name="home" component={MartAndCartRoute} options={{headerShown: false}}/>
    <Tab.Screen name="setting" component={AccountPage} options={{headerShown: false}}/>
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
    primary: darkColors.b,
    background: darkColors.primary,
  },
});
const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const Navigation = () => {
  const { theme } = useTheme();

  if (!theme) {
    return null;
  }
  return (
    <NavigationContainer
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
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeSettings}>
        <Navigation />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

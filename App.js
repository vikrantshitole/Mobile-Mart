import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateAddressPage from './src/pages/CreateAddressPage';
import UpdateAddressPage from './src/pages/UpdateAddressPage';
import Cart from './src/pages/Cart';
import Signup from './src/pages/Signup';
import Signin from './src/pages/Signin';
import MartListPage from './src/pages/MartListPage';
import DetailItemPage from './src/pages/DetailItemPage';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const AddressRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen name='address' component={AddressPage}/>
    <Stack.Screen name='create-address' component={CreateAddressPage} /> 
    <Stack.Screen name='update-address' component={UpdateAddressPage} />
  </Stack.Navigator>
)

const CartRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name="cart" component={Cart} />
    <Stack.Screen name="address" component={AddressRoutes} />
  </Stack.Navigator>
)

const AuthRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name='signup' component={Signup}/>
    <Stack.Screen name='signin' component={Signin}/>
  </Stack.Navigator>
)


const ItemRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name='list' component={MartListPage}/>
    <Stack.Screen name='detail' component={DetailItemPage}/>
  </Stack.Navigator>
)

const MainFlowRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name='mart' component={ItemRoute}/>
    <Stack.Screen name='cart' component={CartRoute}/>
  </Stack.Navigator>
)

const AppRoute = () => (
  <Stack.Navigator>
    <Stack.Screen name='auth' component={AuthRoute}/>
    <Stack.Screen name='main' component={MainFlowRoute}/>
  </Stack.Navigator>
)
const App = () => (
  <NavigationContainer>
    <AppRoute />
  </NavigationContainer>
)

export default App
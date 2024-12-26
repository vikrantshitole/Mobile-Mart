import { Button, Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { signout } from '../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccountPage = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = () => {
    dispatch(signout());
    AsyncStorage.removeItem('token')
    navigation.navigate("auth")
  }
  return (
    <View style={{
      paddingLeft: inset.left,
      paddingRight: inset.right,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      flex: 1,
      width: "100%",
      alignItems: "flex-end"
    }}>
      <Button type="outline" onPress={logout}>Sign Out </Button>
    </View>
  )
}

export default AccountPage
import { Button, makeStyles, Switch, Text, useTheme } from '@rneui/themed'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { signout } from '../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { makeStyles, Switch } from '@rneui/base'

const AccountPage = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checked, SetChecked] = useState(false);
  const {theme,updateTheme} = useTheme()
  const styles = useStyles({checked},theme)

  const logout = () => {
    dispatch(signout());
    AsyncStorage.removeItem('token')
    navigation.navigate("auth")
  }
  const onChange = (value) => {
    SetChecked(value)
    updateTheme({mode: value?'dark': 'light'})
  }
  return (
    <View style={{
      marginTop: 20,
      paddingLeft: inset.left,
      paddingRight: inset.right,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      flex: 1,
      width: "100%",
      alignItems: "flex-end"
    }}>
      <Button type="outline" onPress={logout}>Sign Out </Button>
      <View style={styles.toggleView}>
        <Text style={styles.toggleText}>{checked ? "Dark" : "Light"}</Text>
        <Switch 
          value={checked} onValueChange={onChange} 
          trackColor={{ false: theme.colors.secondary, true: theme.colors.primary }} 
          thumbColor={checked ? theme.colors.primary : theme.colors.secondary} 
        />
      </View>
    </View>
  )
}

const useStyles = makeStyles((theme,props = {}) => {  
  return{
    toggleView: {
      flexDirection: 'row',
      justifyContent: "flex-end"
    },
    toggleText: {
      marginRight: 15,
      marginTop: 12,
      fontSize: 20,
      color: props.checked ? theme.colors.primary : theme.colors.secondary
    }  
}
})
export default AccountPage
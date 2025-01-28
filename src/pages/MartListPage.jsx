import { makeStyles, SearchBar, Switch, Text, useTheme } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ListItemsView from '../components/MartItemView/ListItemsView/ListItemsView'
import GridItemsView from '../components/MartItemView/GridItemsView/GridItemsView'
import api from '../api/axios'
import { useDispatch } from 'react-redux'
import { getProduct } from '../redux/actions/productAction'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    }  ,
    container: {
      backgroundColor: theme.colors.background
    }
}
})
const MartListPage = () => {
  const [checked, SetChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme()
  const styles = useStyles({checked},theme)
  const dispatch = useDispatch()

    const getProducts = async() => {
        try {
          const response = await api.get('/products');          
          // let cart = await AsyncStorage.getItem('cart')
          // cart = cart && cart.length ? JSON.parse(cart):[]
          dispatch(getProduct(response.data, []))        
        } catch (error) {        
          console.log(JSON.stringify(error),'mart list');
          
        }
    }
    
      useEffect(() => {
        getProducts()
        
      },[])
  return (
    <View>
      <SearchBar lightTheme={theme.mode === "light"} value={searchText} onChangeText={setSearchText}/>
      <View style={styles.toggleView}>
        <Text style={styles.toggleText}>{checked ? "Grid" : "List"}</Text>
        <Switch 
          value={checked} onValueChange={SetChecked} 
          trackColor={{ false: theme.colors.secondary, true: theme.colors.primary }} 
          thumbColor={checked ? theme.colors.primary : theme.colors.secondary} 
        />
      </View>
      {
        checked ? <GridItemsView searchText={searchText} /> : <ListItemsView searchText={searchText} />
      }
    </View>
  )
}
export default MartListPage
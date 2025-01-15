
import { PlatformPressable } from '@react-navigation/elements';
import { makeStyles } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';
import axios from 'axios';
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/actions/productAction';

const ListItemsView = ({searchText}) => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme()
  const styles = useStyles(theme);
  const {products,cart} = useSelector((state)=> state.product)
  const prod = useSelector((state)=> state.product)
  
  const setFavorite = (productId) => {
    const index = products.findIndex(p=>p._id === productId)
    const copyProducts = [...products];
    copyProducts[index].is_favorite = copyProducts[index].is_favorite ? !copyProducts[index].is_favorite : true
    setProducts(copyProducts)
  }
  // console.log(products,"productsgrid",prod);
  
  const filteredProducts = useMemo(() => {
      return products.filter(p=>searchText ? p.title.toLowerCase().includes(searchText.toLowerCase()): true);
  },[searchText,products])
  
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredProducts}
        horizontal
        renderItem={({item}) => <ListItem item={item} type="list" setFavorite={setFavorite}/>}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    paddingTop:60,
  },
  searchInputContainer:{
    paddingHorizontal:20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    backgroundColor:'#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer:{
    paddingHorizontal:20,
  }
}));

export default ListItemsView
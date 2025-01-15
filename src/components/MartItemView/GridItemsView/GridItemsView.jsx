
import { PlatformPressable } from '@react-navigation/elements';
import { makeStyles } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import ListItem from '../ListItemsView/ListItem';
import api from '../../../api/axios';
import { useSelector } from 'react-redux';

const ListItemsView = (props) => {
  const [searchText, setSearchText] = useState('');
  // const [products, setProducts] = useState([]);
  const theme = useTheme()
  const styles = useStyles(props,theme);
  const {products} = useSelector(state => state.product)
  const prod = useSelector(state => state.product)
  const handleSearch = (text) => {
    setSearchText(text);
  }

  // const getProducts = async () => {
  //   try {
  //     const response = await api.get('/products');
  //     setProducts(response.data)
  //   } catch (error) {
  //     console.log(JSON.stringify(error));

  //   }
  // }

  const setFavorite = (productId) => {
    const index = products.findIndex(p=>p._id === productId)
    const copyProducts = [...products];
    copyProducts[index].is_favorite = copyProducts[index].is_favorite ? !copyProducts[index].is_favorite : true
    setProducts(copyProducts)
  }
  useEffect(() => {
    // getProducts()
  }, [])  

  const filteredProducts = useMemo(() => {
      return products.filter(p=>searchText ? p.title.toLowerCase().includes(searchText.toLowerCase()): true);
  },[searchText,products])
  
  return (
    <View>
      {
        filteredProducts && filteredProducts.length ?
        <FlatList
          contentContainerStyle={styles.propertyListContainer}
          data={filteredProducts}
          renderItem={({ item }) => <ListItem item={item} viewType="grid" setFavorite={setFavorite} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />: <Text>No items</Text>
      }
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer: {
    paddingHorizontal: 20,
  }
}));

export default ListItemsView
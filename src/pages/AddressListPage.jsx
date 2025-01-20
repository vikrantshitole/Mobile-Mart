import { Button, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api/axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useNotification from '../hooks/useNotification';
import { navigate } from '../utils/navigatorRef';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/productAction';

const AddressListPage = () => {
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const { theme } = useTheme();
  const [address, setAddress] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {scheduleNotification} = useNotification()
  
  const getAddress = async () => {
    try {
      const response = await api.get('/address');
      setAddress(response.data.list)
    } catch (error) {
      console.log(error,'address list');

    }
  }

  const navigateToUpdateAddress = (event,item) => {
    try {
      event.stopPropagation();
      navigation.navigate('update-address', { item })
    } catch (error) {
      console.log(error,"Address");

    }
  }
  const selectHandler = (id) => {
    setSelectedAddressId(id)
  }

  const placeOrder = () => {
    try {
      
      navigation.navigate('mart')
      scheduleNotification('Order Placed!', 'Your order has been placed successfully!');
      dispatch(clearCart())
      
    } catch (error) {
      console.log(error,"address list line 51");
      
    }
    // navigation.navigate('hpme')/
  }
  const renderAppointmentCard = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background },{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2}]} onPress={()=> selectHandler(item._id)}>
    {/* <V/iew  onPress={() => selectHandler(item._id)}> */}
      
      <View style={[styles.centerElement, { width: 60 }]}>
        <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => selectHandler(item._id)}>
          <Ionicons type name={item._id == selectedAddressId? "checkmark-circle" : "checkmark-circle-outline"} size={25} color={item._id == selectedAddressId ? "#0faf9a" : "#aaaaaa"} />
        </TouchableOpacity>
      </View>
      <View>

        <Text style={[styles.cardTitle, { color: theme.colors.black }]}>{item.first_name} {item.last_name}</Text>
        <View style={styles.cardContent}>
          <View style={styles.attendeesContainer}>
            <Text>{item.address_line_1}, {item.address_line_2}</Text>
            <Text>{item.city} - {item.pincode}</Text>
            <Text>{item.state}</Text>
            <Text>{item.contact_number}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.success }]}>
              <Text style={styles.buttonText} onPress={(event) => navigateToUpdateAddress( event,item)}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.error }]}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    {/* </View> */}
    </TouchableOpacity>
  );

  useEffect(() => {
    getAddress('as')
  }, [])
  const navigateToCreateAddress= () => {
    navigation.navigate('create-address')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address</Text>
      <Button onPress={navigateToCreateAddress}>Create Address</Button>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={address}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item._id.toString()}
      />
      {selectedAddressId ? <Button onPress={placeOrder}>Place Order</Button>: null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingTop: 10,
  },
  listContainer: {
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10
    },
    // shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardDate: {
    color: '#888',
  },
  cardContent: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  attendeesContainer: {
    // flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
  centerElement: {
    justifyContent: 'center', 
    alignItems: 'center'
  },

});

export default AddressListPage;

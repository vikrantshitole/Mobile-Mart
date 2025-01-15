import { Text } from '@rneui/themed'
import React from 'react'
import { ScrollView, View } from 'react-native'
import AddressForm from '../components/AddressForm/AddressForm'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import api from '../api/axios'
import { useNavigation } from '@react-navigation/native'

const UpdateAddressPage = ({route}) => {
  const {item} = route.params;
  const inset2 = useSafeAreaInsets();
  const navigation = useNavigation();
    
  const updateAddress = async(reqData) => {
    try {
        
      const address = await api.put('/address/update/'+item._id,reqData);
      navigation.navigate('address')
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <View
      style={{
        paddingLeft: inset2.left,
        paddingRight: inset2.right,
        paddingTop: inset2.top,
        paddingBottom: inset2.bottom,
        flex: 1,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ScrollView>
        <AddressForm buttonText='Update Address' address={item} onClick={updateAddress}/>
      </ScrollView>
    </View>
  )
}

export default UpdateAddressPage
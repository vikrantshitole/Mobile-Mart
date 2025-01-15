import React, { useState } from 'react'
import { View } from 'react-native'
import Spacer from '../Spacer/Spacer'
import { Button, Input, Text, useTheme } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import useAddressData, { CHANGE_INPUT, CLEAR_INPUT } from '../../hooks/useAddressData'
const ERROR  = {
  address_line_1e: {
      message:"",
      error: false
  },
  first_name: {
      message:"",
      error: false
  },
  last_name: {
      message:"",
      error: false
  },
  address_line_2: {
      message:"",
      error: false
  },
  city: {
      message:"",
      error: false
  },
  pincode: {
      message:"",
      error: false
  },
  
  state: {
    message:"",
    error: false
  },
  
  contact_number: {
    message:"",
    error: false
  },
}
const AddressForm = (
    {buttonText='',onClick, address = null}
) => {
  const { theme } = useTheme();
  // const style = useStyles(theme);
  const navigation = useNavigation();
  const [state, dispatch] = useAddressData(address);
  const [error, setError ] = useState(ERROR);

  const navigateTo = () => {
    navigation.navigate(route);
  };
  const validation = () => {
      const {first_name,last_name,address_line_1,address_line_2,city,pincode,contact_number} = state;
      const err = JSON.parse(JSON.stringify(error))
      let valid = true;

      if (!first_name) {
        err.first_name.message = "Please enter first name.";
        err.first_name.error = true;
        valid = false;
      }
  
      if (!last_name) {
        err.last_name.message = "Please enter last name.";
        err.last_name.error = true;
        valid = false
      }
  
      if (!address_line_1) {
        err.address_line_1.message = "Please enter Address Line 1.";
        err.address_line_1.error = true;
        valid = false
        
      }
      if (!address_line_2) {
        err.address_line_2.message = "Please enter Address Line 2.";
        err.address_line_2.error = true;
        valid = false
        
      }
      
      if (!city) {
        err.city.message = "Please enter city.";
        err.city.error = true;
        valid = false
        
      }
      
      if (!pincode) {
        err.pincode.message = "Please enter pincode.";
        err.pincode.error = true;
        valid = false
        
      }
      
      if (!contact_number) {
        err.contact_number.message = "Please enter Contact Number.";
        err.contact_number.error = true;
        valid = false
        
      }
      setError(error)
      return valid
    }
    
  const changeInput = (name, value) => {

    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
    setError((prevState) => ({
      ...prevState,
      [name] : {
        message: "",
        error: false
      }
    }))
  }
  
  const createOrUpdateAddress = () =>{
    onClick(state);
    dispatch({type: CLEAR_INPUT})
  }
  return (
    <View>
         <Spacer>
        <Input
          placeholder={"XYZ"}
        
          label={<Text>First Name</Text>}
          value={state.first_name}
          onChangeText={(value) => changeInput("first_name", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"PQR"}
        
          label={<Text>Last Name</Text>}
          value={state.last_name}
          onChangeText={(value) => changeInput("last_name", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"Flat no: 5, Komal Apartment..."}
        
          label={<Text>Address Line 1</Text>}
          value={state.address_line_1}
          onChangeText={(value) => changeInput("address_line_1", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
     
      <Spacer>
        <Input
          placeholder={"Golande Colony..."}
        
          label={<Text>Address Line 2</Text>}
          value={state.address_line_2}
          onChangeText={(value) => changeInput("address_line_2", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"Pune"}
        
          label={<Text>City</Text>}
          value={state.city}
          onChangeText={(value) => changeInput("city", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"411033"}
          label={<Text>Pincode{state.pincode}</Text>}
          value={state.pincode.toString()}
          keyboardType='numeric'
          inputMode='numeric'
          onChangeText={(value) => changeInput("pincode", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"XYZ"}
        
          label={<Text>State</Text>}
          value={state.state}
          onChangeText={(value) => changeInput("state", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      
      <Spacer>
        <Input
          placeholder={"XYZ"}
        
          label={<Text>Contact Number</Text>}
          value={state.contact_number.toString()}
          // inputMode='numeric'
          keyboardType='number-pad'
          onChangeText={(value) => changeInput("contact_number", value)}
          renderErrorMessage={error.emailOrNumber.error}
        />
      </Spacer>
      <Spacer>
        <Button title={buttonText} onPress={createOrUpdateAddress} />
      </Spacer>

    </View>
    )
}

export default AddressForm
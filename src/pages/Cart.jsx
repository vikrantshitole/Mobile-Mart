import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantityOfProduct, increaseQuantityOfProduct, removeCartItem, selectAllProduct, selectProduct } from '../redux/actions/productAction';
// import * as Notification from 'expo-notifications'
import useNotification from '../hooks/useNotification';
import { useNavigation } from '@react-navigation/native';

 const Cart = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [cartItemsIsLoading,setCartItemsIsLoading] = useState(true);
	const {cart} = useSelector(state => state.product);
	const dispatch = useDispatch();
	const {theme}= useTheme();;
	const navigation = useNavigation();
	const {Notification,sendPushNotification} = useNotification()

	const selectHandler = (item) => {
		dispatch(selectProduct(item._id,item.checked))
	}

	
	const selectHandlerAll = (value) => {
		dispatch(selectAllProduct(value))
		setSelectAll((value == true ? false : true))
	}
	
	const deleteHandler = (id) => {
		Alert.alert(
			'Are you sure you want to delete this item from your cart?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
					dispatch(removeCartItem(id))
				}},
			],
			{ cancelable: false }
		);
	}
	
	const quantityHandler = (fn,id) => {		
		dispatch(fn(id))
	}
	
	const subtotalPrice = useMemo(() => {
		if(cart){
			return cart.reduce((sum, item) => sum + (item.checked == 1 ? item.quantity * item.price : 0), 0 );
		}
		return 0;
	},[cart])
	
	
	const checkedCartItem = useMemo(() => {
		if(cart){
			return cart.filter((item) => item.checked );
		}
		return 0;
	},[cart])
		
		useEffect(()=>{
			if (cart && cart.length) {
				setCartItemsIsLoading(false)
			}
		},[cart])

		const scheduleNotification = () => {
			sendPushNotification('Order Placed!', 'Your order has been placed successfully!')
			navigation.navigate('address-page')
		}
		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="cart" size={25} color="#000" />
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
						<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
					</View>
				</View>
				
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color={theme.colors.secondary} />
						<Text> No Items Founds</Text>
						{/* <ActivityIndicator size="large" color={theme.colors.secondary} /> */}
					</View>
				) : (
					<ScrollView>	
						{Array.isArray(cart) && cart.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(item)}>
										<Ionicons type name={item.checked == 1 ? "checkmark-circle" : "checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.image}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.title}</Text>
										{/* <Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Variation: ' + item.color : ''}</Text> */}
                    					<Text numberOfLines={1} style={{color: 'black', marginBottom: 10}}>${item.quantity * item.price}</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => quantityHandler(decreaseQuantityOfProduct, item._id)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.quantity}</Text>
											<TouchableOpacity onPress={() => quantityHandler(increaseQuantityOfProduct, item._id)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(item._id)}>
										<MaterialCommunityIcons name="trash-can" size={24} color="black" />
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "checkmark-circle" : "checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Select All</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>${subtotalPrice.toFixed(2)}</Text>
								</View>
							</View>
						</View>
						{checkedCartItem.length !==0 && <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]} onPress={scheduleNotification}>
								<Text style={{color: '#ffffff'}}>Continue</Text>
							</TouchableOpacity>
						</View>}
					</View>
				}
			</View>
		);
	
}

const styles = StyleSheet.create({
	centerElement: {justifyContent: 'center', alignItems: 'center'},
});

export default Cart
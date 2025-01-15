import React, { useEffect, useState } from 'react'
import * as Notification from 'expo-notifications'
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notification.setNotificationHandler({
    handleNotification: async() => {
      return{
        shouldShowAlert:true,
        shouldSetBadge: false,
        shouldPlaySound: true
      }
    }
})

const useNotification = () => {
    const [token,setToken] = useState('')
    const configurePushNotification = async () => {
        const {status} = await Notification.getPermissionsAsync();
        let finalStatus = status;

        if (status !== 'granted') {
            const {status} = await Notification.requestPermissionsAsync();
            finalStatus = status;
        }

        if (status !== 'granted') {
            Alert.alert('Permission required', 'Push notification require permission');
            return;
        }
        let pushToken = await AsyncStorage.getItem('notification-token');
        if (!pushToken) {
            pushToken = await Notification.getExpoPushTokenAsync()
            await AsyncStorage.setItem('notification-token', pushToken)
        }
        setToken(pushToken)
        if (Platform.OS === 'android') {
            Notification.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notification.AndroidImportance.DEFAULT
            })
        }

    }
    useEffect(()=>{
        configurePushNotification()
    },[])

    const sendPushNotification = (title='',body = '') => {
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        }
        const reqData = {
            to: token,
            title,
            body
        }
    }
    return {sendPushNotification,Notification}
}

export default useNotification
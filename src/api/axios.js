import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl,'apiurl');

const api = axios.create({
    baseURL: apiUrl
})
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})
export default api
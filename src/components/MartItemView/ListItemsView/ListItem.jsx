import { Button, FAB, Icon, Image, makeStyles, Text, useTheme } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-stock-star-rating'
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { addToCart } from '../../../redux/actions/productAction';

const useStyles = makeStyles((theme, props) => ({

    card: {
        height: props.type === 'list' ? 500 : "auto",
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 8,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 10,
            height: 10
        },
        // shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 10,
        width: props.type === 'list' ? 350 : "auto",
        flex: props.type === 'list'?1: 1/2,
        justifyContent: "space-between"
    },
    image: {
        height: props.type === 'list' ? 250 : "auto",
        minHeight:180,
        marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cardBody: {
        marginBottom: 10,
        padding: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 700,
        fontSize: 18
    },
    squareMeters: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666'
    },
    cardFooter: {
        padding: 10,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: "center"
    },
    star: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    starText: {
        marginTop: 10,
        fontSize: 14,
        color: '#ffa500',
        fontWeight: 'bold',
    },
    baths: {
        fontSize: 14,
        color: '#ffa500',
        fontWeight: 'bold'
    },
    parking: {
        fontSize: 14,
        color: '#ffa500',
        fontWeight: 'bold'
    }

}));

const ListItem = memo(({ item, setFavorite, ...props }) => {
    const { theme } = useTheme();
    const styles = useStyles(props, theme)
    const navigation = useNavigation()
    const user= useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const setToFavorite = async(event) => {
        event.stopPropagation()
        try {
            await  api.post('/favorite',{user_id:user._id,product_id: item._id,is_favorite: item.is_favorite? !item.is_favorite:true})
            setFavorite(item._id)
        } catch (error) {
            console.log(error);
            
        }
    }
    const goToDescription= ()=> {
        navigation.navigate('detail',{id: item._id})
    }
    const onSubmitCart = (event) => {
        event.stopPropagation()

        dispatch(addToCart(item))
      }
      
    return (
        <TouchableOpacity style={styles.card} onPress={goToDescription}>
            <View>
                <Image source={{ uri: item.image }} alt={item.title} style={styles.image} />
                <View style={styles.cardBody}>
                    <Text style={styles.price}>{'\u0024'} {item.price}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
            <FAB style={{justifyContent: "flex-end", alignSelf:"flex-end"}} icon={{name:'shopping-cart', color:"#fff"}} title='Add to cart' onPress={onSubmitCart}/>
            <View style={styles.cardFooter}>
                <View style={styles.star}>
                    <Rating stars={item.rating.rate} maxStars={5} size={25} />
                    <Text style={styles.starText}>{item.rating.rate}</Text>
                </View>
                <Text style={styles.baths}>{item.rating.count}  Reviews</Text>
                <Button  onPress={setToFavorite} type='clear' style={styles.parking}><Icon name={item.is_favorite ? "favorite" : "favorite-outline"} type='material-icons' color={'red'} /></Button >
            </View>

            {/* <Text style={{fontSize:28, color: "black"}}>Hi</Text> */}
        </TouchableOpacity>)
})

export default ListItem
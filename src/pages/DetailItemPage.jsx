import { useNavigation } from '@react-navigation/native'
import { } from '@rneui/base'
import { FAB, useTheme, makeStyles, Icon } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/productAction'
import { Rating } from 'react-native-stock-star-rating'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const useStyles = makeStyles((theme, props) => ({

  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebf0f7',
  },
  marginLeft: 10,
  content: {
    marginRight: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  smallImagesContainer: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  btnColor: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 3,
  },
  contentColors: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 22,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#696969',
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: '#00BFFF',
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

  rating: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  ratingStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
))
export default DetailItemPage = ({ route }) => {
  const { id } = route.params
  const { products } = useSelector(state => state.product);
  const productData = products.find(p => p._id === id);
  const [product, setProduct] = useState(productData)
  const [selectedImage, setSelectedImage] = useState()
  const { theme } = useTheme()
  const styles = useStyles({}, theme)
  const dispatch = useDispatch();
  const navigation = useNavigation()
  // useEffect(() => {
  //   setProduct(productData)
  // },[id])
  const __renderImages = () => {
    return (
      <View style={styles.smallImagesContainer}>
        {product.images && product.images.length && product.images.map((prop, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setSelectedImage(prop)
              }}>
              <Image style={styles.smallImage} source={{ uri: prop }} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ({ allowFontScaling, tintColor, style }) => (
        <Text
          numberOfLines={1}
          style={[style, { color: theme.colors.black, textAlign: "center" }]}
          allowFontScaling={allowFontScaling}
        >
          {product.title}
        </Text>
      ),
    });
  }, [navigation, product.title]);
  const onSubmitCart = () => {
    dispatch(addToCart(product))
    // navigation.navigate('cart')

  }
  var mainImage = selectedImage ? selectedImage : product.images[0]
  console.log(mainImage);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{product.title}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <View style={styles.mainImageContainer}>
                <Image style={styles.mainImage} source={{ uri: mainImage }} />
              </View>
              {__renderImages()}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.cardContent, styles.ratingStar]}>
            <View style={styles.star}>
              <Rating stars={product.rating.rate} maxStars={5} size={25} />
              <Text style={styles.starText}>{product.rating.rate}</Text>
            </View>
            <Text style={styles.rating}>{product.rating.count}  Reviews</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Description</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity style={styles.shareButton} onPress={onSubmitCart}  >

              <Icon
                name='shopping-cart'
                type='font-awesome'
                color={theme.colors.background}
              />
              <Text style={styles.shareButtonText}  > Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

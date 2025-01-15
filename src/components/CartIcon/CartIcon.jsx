import { FAB, Icon, useTheme } from '@rneui/themed'
import React from 'react'
import { navigate } from '../../utils/navigatorRef'

const CartIcon = () => {
    const {theme} = useTheme()
  return (
    <Icon
        name='shopping-cart'
        type='font-awesome'
        color={theme.colors.primary}
        onPress={() => navigate('cart-page')} />    )
}

export default CartIcon
import { Badge, Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { navigate } from '../../utils/navigatorRef';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const { theme } = useTheme();
  const { cart } = useSelector(state => state.product);

  return (
    <View>
      <Icon
        testID="cart-icon"
        name="shopping-cart"
        type="font-awesome"
        color={theme.colors.primary}
        onPress={() => navigate('cart-page')}
      />
      {cart && cart.length > 0 && (
        <Badge
          testID="cart-badge"
          status="error"
          value={cart.length}
          containerStyle={{ position: 'absolute', top: -7, left: 10 }}
        />
      )}
    </View>
  );
};

export default CartIcon;
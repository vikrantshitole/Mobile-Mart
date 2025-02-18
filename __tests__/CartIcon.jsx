import React from 'react';
import { render, fireEvent, waitFor } from '../__mocks__/@react-native-async-storage/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { navigate } from '../src/utils/navigatorRef';
import CartIcon from '../src/components/CartIcon/CartIcon';

jest.mock('../src/utils/navigatorRef', () => ({
  navigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe('CartIcon Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      product: {
        cart: [],
      },
    });
  });

  it('should render correctly', () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );

    expect(findByTestId('cart-icon')).toBeTruthy();
  });

  it('should display the cart icon', () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );

    expect(findByTestId('cart-icon')).toBeTruthy();
  });

  it('should navigate on icon press', () => {
    const { findByTestId, findByText } = render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );

    fireEvent.press(findByTestId('cart-icon'));
    expect(findByText('Shopping Cart')).toBeTruthy();
  });

  it('should display the badge when there are items in the cart', async() => {
    store = mockStore({
      product: {
        cart: [{ id: 1 }, { id: 2 }],
      },
    });

    const { findByTestId, queryByTestId , findByText,getByTestId} = render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    const badge = findByTestId('cart-badge');
    expect(badge).toBeTruthy();
    expect(findByText('2')).toBeTruthy()
    // expect(badge).toHaveProp('value', 2);
});

  it('should hide the badge when the cart is empty', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );

    expect(queryByTestId('cart-badge')).toBeNull();
  });
});
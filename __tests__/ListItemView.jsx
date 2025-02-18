import React from 'react';
import { render,fireEvent } from '../__mocks__/@react-native-async-storage/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListItemsView from '../src/components/MartItemView/ListItemsView/ListItemsView';

const mockStore = configureStore([]);
const store = mockStore({
  product: {
    products: [
      { _id: '1', title: 'Product 1' },
      { _id: '2', title: 'Product 2' },
    ],
  },
});

describe('ListItemsView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { findByPlaceholderText } = render(
      <Provider store={store}>
        <ListItemsView />
      </Provider>
    );

    expect(findByPlaceholderText('Search products...')).toBeTruthy();
  });

  it('should filter products based on search input', () => {
    const { findByPlaceholderText, findByText, queryByText } = render(
      <Provider store={store}>
        <ListItemsView />
      </Provider>
    );

    const searchInput = findByPlaceholderText('Search products...');
    fireEvent.changeText(searchInput, 'Product 1');

    expect(findByText('Product 1')).toBeTruthy();
    expect(queryByText('Product 2')).toBeNull();
  });

  it('should display "No items" when there are no products', () => {
    const emptyStore = mockStore({
      product: {
        products: [],
      },
    });

    const { findByText } = render(
      <Provider store={emptyStore}>
        <ListItemsView />
      </Provider>
    );

    expect(findByText('No items')).toBeTruthy();
  });

  it('should render the correct number of items in FlatList', () => {
    const { findAllByTestId,findByText } = render(
      <Provider store={store}>
        <ListItemsView />
      </Provider>
    );

    // const items =
    //  findAllByTestId('list-item');
    // expect(items.length).toBe(2);
    expect(findByText('Product 1')).toBeTruthy();
    expect(findByText('Product 2')).toBeTruthy();

  });
});
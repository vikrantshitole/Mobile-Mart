import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import SignIn from '../src/pages/SignIn';
import { useNavigation } from '@react-navigation/native';
import api from '../src/api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/api/axios');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockStore = configureStore([]);
const store = mockStore({});

describe('SignIn Component', () => {
  const navigation = { navigate: jest.fn() };
  useNavigation.mockReturnValue(navigation);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it('should render correctly', () => {
    const { findByText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    expect(findByText('Sign In To Mobile Mart')).toBeTruthy();
  });

  // it('should call register function on button click', async () => {
  //   const { findByText, findByPlaceholderText, findByTestId } = render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>
  //   );

  //   fireEvent.changeText(findByTestId('username'), 'testuser');
  //   fireEvent.changeText(findByPlaceholderText('Password'), 'password');
  //   fireEvent.changeText(findByPlaceholderText('Confirm Password'), 'password');
  //   fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
  //   fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');
  //   const btn = findByTestId('SignUpButton');
  //   expect(btn).toBeTruthy()
  //   fireEvent.press(btn);

  //   await waitFor(() => {
  //     expect(api.post).toHaveBeenCalledWith('/signup', {
  //       username: 'testuser',
  //       password: 'password',
  //       firstName: 'Test',
  //       lastName: 'User',
  //     });
  //   });
  // });

  it('should navigate to main screen on successful signup', async () => {
    api.post.mockResolvedValue({
      data: { token: 'testtoken', user: { id: 1, username: 'testuser' } },
    });
    AsyncStorage.setItem.mockResolvedValue();

    const { findByText, findByPlaceholderText,findByTestId } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    fireEvent.changeText(findByTestId('username'), 'testuser');
    fireEvent.changeText(findByPlaceholderText('Password'), 'password');
    fireEvent.changeText(findByPlaceholderText('Confirm Password'), 'password');
    fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
    fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

    fireEvent.press(findByText('Sign In'));

    await waitFor(() => {
      expect(findByText('Mart')).toBeTruthy();
    });
  });

  // it('should handle errors during signup', async () => {
  //   api.post.mockRejectedValue(new Error('SignIn failed'));

  //   const { findByText, findByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>
  //   );

  //   fireEvent.changeText(findByPlaceholderText('email@address.com'), 'testuser');
  //   fireEvent.changeText(findByPlaceholderText('Password'), 'password');
  //   fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
  //   fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

  //   fireEvent.press(findByText('Sign Up'));

  //   await waitFor(() => {
  //     expect(console.log).toHaveBeenCalledWith(JSON.stringify(new Error('SignIn failed')));
  //   });
  // });

  // // Additional test cases
  it('should display error message for missing email or mobile number', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
    fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Please enter email')).toBeTruthy();
  });

  it('should display error message for invalid email format', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('email@address.com'), 'invalidemail');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
    fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Please enter valid email')).toBeTruthy();
  });

  it('should display error message for invalid mobile number format', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('8855824455'), '12345');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
    fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Please enter valid mobile number')).toBeTruthy();
  });

  it('should display error message for password validation', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('email@address.com'), 'test@example.com');
    fireEvent.changeText(findByPlaceholderText('Password'), 'password');
    fireEvent.changeText(findByPlaceholderText('First Name'), 'Test');
    fireEvent.changeText(findByPlaceholderText('Last Name'), 'User');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character')).toBeTruthy();
  });

  it('should display error message for password and confirm password mismatch', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('email@address.com'), 'test@example.com');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password1234!');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Confirm password should be same as that of password')).toBeTruthy();
  });

  it('should display error message for missing first name', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('email@address.com'), 'test@example.com');
    fireEvent.changeText(findByPlaceholderText('PQR...'), 'Doe');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Please enter first name')).toBeTruthy();
  });

  it('should display error message for missing last name', () => {
    const { findByText, findByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.changeText(findByPlaceholderText('email@address.com'), 'test@example.com');
    fireEvent.changeText(findByPlaceholderText('XYZ...'), 'John');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');
    fireEvent.changeText(findByPlaceholderText('Password'), 'Password123!');

    fireEvent.press(findByText('Sign Up'));

    expect(findByText('Please enter last name')).toBeTruthy();
  });
});
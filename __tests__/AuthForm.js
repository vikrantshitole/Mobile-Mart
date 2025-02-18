import React from 'react';
import { render, fireEvent, waitFor } from '../__mocks__/@react-native-async-storage/test-utils'; // Adjust the path to your test-utils file
import AuthForm from '../src/components/AuthForm/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('../src/hooks/useAuthData', () => ({
  __esModule: true,
  default: () => [mockDispatch],
  CHANGE_INPUT: 'CHANGE_INPUT',
}));

describe('AuthForm Component', () => {
  const navigation = { navigate: jest.fn() };
  useNavigation.mockReturnValue(navigation);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthForm {...props} />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  };

  it('should render correctly', async () => {
    const { getByTestId, debug, getByText, findByText } = renderComponent({
      title: 'Sign Up To Mobile Mart',
      buttonText: 'Sign Up',
      route: 'Home',
      alreadyHaveAccountText: 'Already have an account? Sign In',
      onClick: jest.fn(),
    });
    debug();
    await waitFor(() => {
      const signUpButton = findByText('Sign Up To Mobile Mart');
      expect(signUpButton).toBeTruthy();
    });
  });

  it('validates email input correctly', async () => {
    const { findByPlaceholderText, getByText, findByText } = renderComponent({
      title: 'Sign Up',
      buttonText: 'Sign Up',
      route: 'Home',
      alreadyHaveAccountText: 'Already have an account? Sign In',
      onClick: jest.fn(),
    });

    const emailInput = findByPlaceholderText('email@address.com');
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(findByText('Sign Up'));

    await waitFor(() => {
      expect(findByText('Please enter valid email.')).toBeTruthy();
    });
  });

  it('validates password input correctly', async () => {
    const { findByPlaceholderText, getByText, findByText } = renderComponent({
      title: 'Sign Up',
      buttonText: 'Sign Up',
      route: 'Home',
      alreadyHaveAccountText: 'Already have an account? Sign In',
      onClick: jest.fn(),
    });

    const passwordInput = findByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'short');
    fireEvent.press(findByText('Sign Up'));

    await waitFor(() => {
      expect(findByText('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.')).toBeTruthy();
    });
  });

  it('navigates to the correct route on button press', () => {
    const { findByText } = renderComponent({
      title: 'Sign Up',
      buttonText: 'Sign Up',
      route: 'Home',
      alreadyHaveAccountText: 'Already have an account? Sign In',
      onClick: jest.fn(),
    });

    fireEvent.press(findByText('Already have an account? Sign In'));
    expect(findByText('Mobile Mart')).toBeTruthy()
  });

  it('dispatches the correct action on input change', () => {
    const { findByPlaceholderText,findByText } = renderComponent({
      title: 'Sign Up',
      buttonText: 'Sign Up',
      route: 'Home',
      alreadyHaveAccountText: 'Already have an account? Sign In',
      onClick: jest.fn(),
    });

    const emailInput = findByPlaceholderText('email@address.com');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(findByText('test@example.com'))
  });
});
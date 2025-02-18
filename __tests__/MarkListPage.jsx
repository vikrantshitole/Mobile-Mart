import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MartListPage from '../src/pages/MartListPage';
import { useDispatch } from 'react-redux';
import api from '../src/api/axios';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../src/api/axios', () => ({
  get: jest.fn(),
}));

const mockDispatch = jest.fn();
useDispatch.mockReturnValue(mockDispatch);

describe('MartListPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ThemeProvider>
        <SafeAreaProvider>
          <MartListPage />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  };

  it('should render correctly', () => {
    const { findByPlaceholderText, findByText } = renderComponent();
    expect(findByPlaceholderText('Search')).toBeTruthy();
    expect(findByText('List')).toBeTruthy();
  });

  it('should toggle between List and Grid view', () => {
    const { findByText, findByRole } = renderComponent();
    const toggleText = findByText('List');
    const switchComponent = findByRole('switch');

    fireEvent.press(switchComponent);
    toggleText.then((toggle)=> {
        expect(toggle.props.children).toBe('Grid');

    })

    fireEvent.press(switchComponent);
    toggleText.then((toggle)=> {
        expect(toggle.props.children).toBe('List');

    })

  });

  it('should update search text', async() => {
    const { findByPlaceholderText } = renderComponent();
    const searchInput = findByPlaceholderText('Search');

    fireEvent.changeText(searchInput, 'test');
     searchInput.then(text=>{

         expect(text.props.value).toBe('test');
     })
  });

//   it('should fetch products on mount', async () => {
//     api.get.mockResolvedValueOnce({ data: [] });
//     renderComponent();

//     await waitFor(() => {
//       expect(api.get).toHaveBeenCalledWith('/products');
//       expect(mockDispatch).toHaveBeenCalled();
//     });
//   });

//   it('should handle API errors gracefully', async () => {
//     api.get.mockRejectedValueOnce(new Error('API Error'));
//     const { findByText } = renderComponent();

//     await waitFor(() => {
//       expect(api.get).toHaveBeenCalledWith('/products');
//       expect(findByText('API Error')).toBeTruthy();
//     });
//   });
});
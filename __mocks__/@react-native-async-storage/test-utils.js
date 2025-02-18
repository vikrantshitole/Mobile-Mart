import React from 'react';
import { render } from '@testing-library/react-native';
import { createTheme, darkColors, lightColors, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

// Define your theme settings
const themeSettings = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: lightColors.primary,
    background: lightColors.background,
  },
  mode: "light",
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
    primary: darkColors.primary,
    background: darkColors.background,
  },
});

// Custom render function
const customRender = (ui, options) =>
  render(
    <SafeAreaProvider>
      <ThemeProvider theme={themeSettings}>
        {ui}
      </ThemeProvider>
    </SafeAreaProvider>,
    options
  );

// Re-export everything from the testing library
export * from '@testing-library/react-native';

// Override the render method
export { customRender as render };
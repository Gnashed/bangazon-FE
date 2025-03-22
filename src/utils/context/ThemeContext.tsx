/**
 * 
 * createContext allows you to manage global state and pass data even to deeply nested components in the React component tree.
 * 
 * The basic steps for using createContext:
 *   1. create a Context
 *   2. Provide the Context Value
 *   3. Consume the Context in Child Components.
 * 
 * Remember the following when setting up createContext:
 *   1. it creates a global state
 *   2. useContext allows child components to consume the context easily.
 *   3. Using a provier at the top level ensures all components have access.
 *   4. A custom hoook (ex. useTheme) makes it easier to consume context safely.
 */

import { createContext, useState, ReactNode, useContext } from 'react';

// Define shape of the context data
interface ThemeContextInterface {
  theme: string;
  toggleTheme: () => void;
};

// Create the context with a default value. In this case 'undefined'.
const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

// Provider component. children refers to whatever components are wrapped inside this provider. ReactNode is anything that React can render. It includes JSX elements, strings, numbers, null/undefined, and other components. This just makes sure only valid React elements are passed.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Values are passed down to any child component that consumes the context.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';
import { ModalProvider } from './hooks/useModal';
import TaskBoard from './components/TaskBoard';
import CreateTodo from './components/CreateTask';

const queryClient = new QueryClient();

export default () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
              <Routes>
                <Route index element={<TaskBoard toggleTheme={toggleTheme} />} />
                <Route path=":new" element={<CreateTodo />} />
              </Routes>
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

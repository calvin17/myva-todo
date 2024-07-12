import React from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import store from './store';
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';
import { ModalProvider } from './hooks/useModal';
import TaskBoard from './components/TaskBoard';
import CreateTodo from './components/CreateTask';

export default () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
            <Routes>
              <Route index element={<TaskBoard toggleTheme={toggleTheme} />} />
              <Route path=":new" element={<CreateTodo />} />
            </Routes>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  );
};

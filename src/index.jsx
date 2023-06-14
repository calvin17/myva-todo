import React from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/themes/theme';
import store from './store';

import Dashboard from './components/TaskBoard';
import CreateTodo from './components/CreateTask';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path=":new" element={<CreateTodo />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
};

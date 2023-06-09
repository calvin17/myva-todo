// import('./bootstrap');
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import CreateTodo from './components/CreateTodo';

export default () => {
  return (
    <div>
      <Routes path="/">
        <Route index element={<Dashboard />} />
        <Route path=":new" element={<CreateTodo />} />
      </Routes>
    </div>
  );
};

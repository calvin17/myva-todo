import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import CreateTodo from './components/CreateTodo';

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/new" element={<CreateTodo />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

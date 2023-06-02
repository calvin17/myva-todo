import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <React.Fragment>
      Dashboard in Todo
      <Link to="/new">Create Todo</Link>
    </React.Fragment>
  );
}

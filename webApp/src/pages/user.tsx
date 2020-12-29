import { Link } from 'gatsby';
import React from 'react';

const User = () => {
  return (
    <>
      <div style={{ height: '7vh' }} />
      <div style={{ height: '50vh' }}>
        <Link to="/product">User</Link>
      </div>
    </>
  );
};

export default User;

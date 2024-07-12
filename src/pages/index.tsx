import { useUser } from '@/context/web3UserContext';
import React from 'react';

const Home: React.FC = () => {
  const { login, loggedIn, logout } = useUser();
  return (
    <div className="container">
      <h1 className="title">
        Welcome to the Home Page
      </h1>
      {!loggedIn ? (        <button onClick={login}>Login</button>) : (      <button onClick={logout}>logout</button>)} {

      } 
      
    </div>
  );
};

export default Home;
import React from 'react';
// import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import '../styles.css'; // Import the styles.css file

const Logout = () => {
  const handleLogout = () => {
    Auth.logout(); // Remove the JWT token from local storage
    window.location.replace('/'); // Redirect the user to the homepage or login page
  };

  return ( 'hi'
  );
};

export default Logout;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { ThemeProvider } from 'react-bootstrap'; // Import ThemeProvider
import client from './index'; // Import your Apollo Client instance
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import './styles.css';



function App() {
  return (
        <Router>
          <Home />
        </Router>
  );
}

export default App;
import React from 'react';  // Import React library
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Import necessary components from react-router-dom for routing

// Import the components for the different pages
import Home from './pages/Home';
import CustomizeQuotes from './pages/CustomizeQuotes';
import Quotes from './pages/Quotes';
import PasswordRecovery from './pages/PasswordRecovery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Calendar from './pages/Calendar';
import UserAccount from './pages/UserAccount';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import NotFound from './pages/NotFound';

function App() {
  return (
    // Set up the Router to handle routing within the app
    <Router>
      {/* Switch ensures that only one route is rendered at a time */}
      <Switch>
        {/* Define routes for each page */}
        <Route exact path="/" component={Home} />  // Route for the home page
        <Route path="/personnaliser-citations" component={CustomizeQuotes} />  // Route for customizing quotes page
        <Route path="/citations" component={Quotes} />  // Route for quotes page
        <Route path="/recuperation-mot-de-passe" component={PasswordRecovery} />  // Route for password recovery page
        <Route path="/connexion" component={Login} />  // Route for login page
        <Route path="/inscription" component={Signup} />  // Route for signup page
        <Route path="/a-propos" component={About} />  // Route for about page
        <Route path="/calendrier" component={Calendar} />  // Route for calendar page
        <Route path="/compte-user" component={UserAccount} />  // Route for user account page
        <Route path="/politique-de-confidentialite" component={PrivacyPolicy} />  // Route for privacy policy page
        <Route path="/mentions-legales" component={LegalNotice} />  // Route for legal notice page
        <Route component={NotFound} />  // Route for handling 404 Not Found
      </Switch>
    </Router>
  );
}

export default App;  // Export the App component as default



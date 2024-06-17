import React from 'react';  // Import React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import necessary components from react-router-dom for routing

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
      <Routes>

        {/* Define routes for each page */}
        <Route path="/" element={<Home />} />  {/* Route for the home page */}
        <Route path="/CustomizeQuotes" element={<CustomizeQuotes />} />  {/* Route for customizing quotes page */}
        <Route path="/Quotes" element={<Quotes />} />  {/* Route for quotes page */}
        <Route path="/PasswordRecovery" element={<PasswordRecovery />} />  {/* Route for password recovery page */}
        <Route path="/Signup" element={<Signup />} />  {/* Route for login page */}
        <Route path="/Login" element={<Login />} />  {/* Route for signup page */}
        <Route path="/About" element={<About />} />  {/* Route for about page */}
        <Route path="/Calendar" element={<Calendar />} />  {/* Route for calendar page */}
        <Route path="/UserAccount" element={<UserAccount />} />  {/* Route for user account page */}
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />  {/* Route for privacy policy page */}
        <Route path="/LegalNotice" element={<LegalNotice />} />  {/* Route for legal notice page */}
        <Route path="*" element={<NotFound />} />  {/* Route for handling 404 Not Found */}

      </Routes>
    </Router>
  );
}

export default App;  // Export the App component as default
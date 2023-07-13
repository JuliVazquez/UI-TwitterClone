import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from "./components/pages/homeScreen";
import PrivateRoute from './PrivateRoute.jsx';
import LoginScreen from "./components/pages/loginScreen";
import RegisterScreen from './components/pages/registerScreen';
import ExploreScreen from './components/pages/exploreScreen';
import PublicRoute from './PublicRoute';
import UserScreen from './components/pages/UserScreen';
import SearchResults from './components/pages/SearchResults';
import TweetPage from './components/pages/tweetPage';
import NotFoundPage from './components/pages/NotFoundPage';

const App = () => {

  return (
  <Routes>
      <Route path="/" element={<PublicRoute > <LoginScreen /> </PublicRoute>}/>
      <Route path="/login" element={<PublicRoute > <LoginScreen /> </PublicRoute>}/>
      <Route path="/register" element={<PublicRoute > <RegisterScreen /> </PublicRoute>}/>
      <Route path="/home" element={<PrivateRoute > <HomeScreen /> </PrivateRoute>}/>
      <Route path="/explore" element={<PrivateRoute > <ExploreScreen /> </PrivateRoute>}/>
      <Route path="/user/:userId" element={<PrivateRoute > <UserScreen /> </PrivateRoute>}/>
      <Route path="/search/:searchText" element={<PrivateRoute > <SearchResults /> </PrivateRoute>}/>
      <Route path="/tweet/:tweetId" element={<PrivateRoute > <TweetPage /> </PrivateRoute>}/>
      <Route path="*" element={<NotFoundPage />} />
  </Routes>
  );

}

export default App;
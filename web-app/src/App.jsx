// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContentCreator from './pages/ContentCreator';
import Advertiser from './pages/Advertiser';
import Bidding from './pages/bidding-war-dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content-creator" element={<ContentCreator />} />
        <Route path="/advertiser" element={<Advertiser />} />
        <Route path="/bidding" element={<Bidding />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Plans from './components/Plans';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="App">
      <Header onLoginClick={handleLoginClick} />
      <Hero />
      <About />
      <Plans />
      <ChatBot />
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
      />
    </div>
  );
}

export default App;


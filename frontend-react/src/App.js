import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import authService from './services/auth.service';

function App() {
  useEffect(() => {
    authService.checkJwt();
  }, []);

  return (
    <main>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
        </Routes>
        <Footer/>
      </Router>
    </main>
  );
}

export default App;

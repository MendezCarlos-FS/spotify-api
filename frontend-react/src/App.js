import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import authService from './services/auth.service';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService.checkJwt(setLoading);
  }, []);

  return (
    <main>
      <Router>
        {
          loading
          ? <h2>Loading...</h2>
          :
          <>
            <Header/>
            <Routes>
              <Route path='/' exact element={<Home/>}/>
            </Routes>
          </>
        }
        <Footer/>
      </Router>
    </main>
  );
}

export default App;

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
    <main style={styles.container}>
      <Router>
        {
          loading
          ? <h1 style={styles.loading}>Loading...</h1>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#171314",
    minHeight: "100vh",
  },
  loading: {
    color: "white",
    textAlign: "center",
  }
}

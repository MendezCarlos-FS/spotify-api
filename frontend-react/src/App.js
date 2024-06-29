import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header/>
      <main>
        <Login/>
      </main>
      <Footer/>
    </>
  );
}

export default App;

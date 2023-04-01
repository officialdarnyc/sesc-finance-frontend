//import logo from './logo.svg';
import './styles.css';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/portal" exact element={<Dashboard />} />
      </Routes>
  );
}

export default App;

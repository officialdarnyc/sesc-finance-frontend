//import logo from './logo.svg';
import './styles.css';
import { Route, Router, Routes } from 'react-router-dom';
import Portal from './components/portal';

function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Portal />} />
      </Routes>
  );
}

export default App;

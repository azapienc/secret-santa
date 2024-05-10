import { Route, Routes } from 'react-router-dom';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import "./firebase.config";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/secret" element={<Dashboard/>} />
    </Routes>
    </>
  );
}

export default App;

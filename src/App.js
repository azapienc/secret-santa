import "./firebase.config";
import { Route, Routes } from 'react-router-dom';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { ResetDatabase } from './components/ResetDatabase';
import { ResetState } from "./components/ResetState";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/secret" element={<Dashboard/>} />
      <Route path="/resetDatabase" element={<ResetDatabase/>} />
      <Route path="/reset" element={<ResetState/>} />
    </Routes>
    </>
  );
}

export default App;

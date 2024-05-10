import "./firebase.config";
import { Route, Routes } from 'react-router-dom';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { ResetDatabase } from './components/ResetDatabase';
import { Results } from "./components/Results";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/secret" element={<Dashboard/>} />
      <Route path="/results" element={<Results/>} />
      <Route path="/resetDatabase" element={<ResetDatabase/>} />
    </Routes>
    </>
  );
}

export default App;

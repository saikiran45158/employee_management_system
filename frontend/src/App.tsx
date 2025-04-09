import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import './App.css'
import Protected from './components/Protected';
export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route element={<Protected />}>
        <Route path='home' element={<Home />}>  </Route>
      </Route>
    </Routes>
  );
}     


 

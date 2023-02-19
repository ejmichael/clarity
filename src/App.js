import { Routes, Route, Navigate } from 'react-router-dom'

//pages
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';

//components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EditProduct from './pages/edit/EditProduct';
import ViewProduct from './components/productView/ViewProduct';
import Navbar from './components/navbar/Navbar';

import { AuthContext } from './context/AuthContext'
import { useContext } from 'react';

function App() {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);

  const RequiredUser = ({children}) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  const AdminUser = ({ children }) => {
    return currentUser?.uid === "hTCStf0SemgEXuO4mC2ts9SaYhq1" ? children : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminUser><Admin /></AdminUser>} />
        <Route path="/" element={<RequiredUser><Home /></RequiredUser>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view/:id" element={<RequiredUser><ViewProduct /></RequiredUser>} />
        <Route path="/edit/:id" element={<AdminUser><EditProduct /></AdminUser>} />
      </Routes>
    </div>
  );
}

export default App;

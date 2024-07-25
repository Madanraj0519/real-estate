import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import {Toaster} from "react-hot-toast"
import UserPrivateRoute from './PrivateRoute/UserPrivateRoute';
import Search from './Pages/Search';

function App() {
  return (
   <BrowserRouter>
     <Header />
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />

      <Route element={<UserPrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<Search />} />
      </Route>
  
     </Routes>

     <Toaster position="top-right" reverseOrder={true} />
   </BrowserRouter>
  );
}

export default App;

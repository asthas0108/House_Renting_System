import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/sign-in' element={<SignIn/>}/>
         <Route path='/sign-out' element={<SignUp/>}/>
         <Route path='/about' element={<About/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App;
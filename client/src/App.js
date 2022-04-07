import './App.css';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import OneCity from './components/OneCity';
import AllCities from './components/AllCities';
import NewCity from './components/NewCity';
import EditCity from './components/EditCity';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  return (

    <BrowserRouter>
      
      <div className="App">
        {/* We must set up our Route component's  
      inside of the Routes component from react-router-dom  */}
        <Routes>
          <Route element={<LogReg/>} path="/" />
          <Route element={<AllCities/>} path="/home" />
          <Route element={<NewCity />} path="/new" />
          {/* This id param will be used and sent as a req.param in our request to the server! */}
          <Route element={<OneCity />} path="/city/:id" />
          <Route element={<EditCity />} path="/city/edit/:id" />
          <Route element={<Profile />} path="/user/profile/:username" />
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
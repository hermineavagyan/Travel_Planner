import './App.css';
//import LogReg from './views/LogReg';
import Login1 from './components/Login1';
import Register1 from './components/Register1';
import Profile from './components/Profile';
import OneCity from './components/OneCity';
import AllCities from './components/AllCities';
import NewCity from './components/NewCity';
import EditCity from './components/EditCity';
import AllMessages from './components/AllMessages';
import MoreInfo from './components/MoreInfo';
import MapContainer from './components/MapContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyContext from "./components/MyContext";
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  const [socket, setSocket] = useState(() => io(":8000"))
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket in the client: ", socket.id)
    })

    return () => socket.disconnect(true);

  }, [])


  return (

    <BrowserRouter>


      <div className="App">
        <MyContext.Provider value={{ cartCount, setCartCount }}>
          <Routes>
            {/* <Route element={<LogReg />} path="/" /> */}
            <Route element={<Login1 />} path="/" />
            <Route element={<Register1 />} path="/register" />
            <Route element={<AllCities />} path="/home" />
            <Route element={<NewCity />} path="/new" />
            {/* This id param will be used and sent as a req.param in our request to the server! */}
            <Route element={<OneCity socket={socket} />} path="/city/:id" />
            <Route element={<EditCity />} path="/city/edit/:id" />
            <Route element={<Profile />} path="/user/profile/:username" />
            <Route element={<AllMessages socket={socket} />} path="/city/:id/:name" />
            <Route path="/country/:countryName" element={<MoreInfo />}></Route>
            <Route path="/myMap/:lat/:lng/:countryName" element={<MapContainer />}></Route>
          </Routes>
        </MyContext.Provider>

      </div>

    </BrowserRouter>

  );
}

export default App;
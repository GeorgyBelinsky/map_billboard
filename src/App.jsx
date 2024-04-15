import './App.css'
import './Components/MapContainer/MapContainer'
import MapContainer from './Components/MapContainer/MapContainer';
import NavBar from './Components/NavBar/NavBar';
import UserPage from './Components/UserPage/UserPage';
import UserInfo from './Components/UserInfo/UserInfo';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [markers, setMarkers] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://bord.azurewebsites.net/api/Bord/BoardDetails');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setMarkers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/support"/>
        <Route path="/" element={<MapContainer markers={markers} fetchData={fetchData} />} />
        <Route path="/login" element={<UserPage />} />
        <Route path="/user" element={<UserInfo />} />
      </Routes>
    </>
  )
}

export default App;
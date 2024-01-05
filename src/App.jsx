import './App.css'
import './Components/MapContainer/MapContainer'
import MapContainer from './Components/MapContainer/MapContainer';
import NavBar from './Components/NavBar/NavBar';
import UserPage from './Components/UserPage/UserPage'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [markers, setMarkers] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://bord.azurewebsites.net/api/Bord');

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


  /*    const markers = [
      { id: 1, latitude: 49.9935, longitude: 36.2304, adress: 'vul. Sumska 12',
      rentalDates:["2023.12.28","2023.12.31"], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' , price:"12312"},
      //{ id: 2234, latitude: 49.9999, longitude: 36.2000, adress: 'vul. Kultury 20,vul. Kultury 20,vul. Kultury 20,', description: 'ReactDOM.render, and its content is set as the content', price:"235423"  },
      //{ id: 3, latitude: 50.0200, longitude: 36.2400, adress: 'prosp. Heroiv 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price:"43"},
      //{ id: 4532, latitude: 50.0300, longitude: 36.2400, adress: 'prosp. Heroiv 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', price:"234" },
      //{ id: 363463, latitude: 49.9920, longitude: 36.25, adress: 'prosp. Userov 14', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price:"745" }
    ];  */

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MapContainer markers={markers} fetchData={fetchData} />} />
        <Route path="/authorization" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App;
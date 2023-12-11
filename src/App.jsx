import './App.css'
import './Components/MapContainer/MapContainer'
import MapContainer from './Components/MapContainer/MapContainer';
import NavBar from './Components/NavBar/NavBar';
import BuyForm from './Components/BuyForm/BuyForm';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const markers = [
    { id: 1, latitude: 49.9935, longitude: 36.2304, title: 'vul. Sumska 12', description: 'In this example, the PopUp component is rendered using' },
    { id: 2, latitude: 49.9999, longitude: 36.2000, title: 'vul. Kultury 20,vul. Kultury 20,vul. Kultury 20,', description: 'ReactDOM.render, and its content is set as the content' },
    { id: 3, latitude: 50.0200, longitude: 36.2400, title: 'prosp. Heroiv 4', description: 'setDOMContent.the usage of ReactDOM.unmountComponentAtNode.setDOMContent.the usage of ReactDOM.unmountComponentAtNode.setDOMContent.the usage of ReactDOM.unmountComponentAtNode.' }
  ];

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/map"/>}></Route>
        <Route path="/map" element={<MapContainer markers={markers}/>} />
        <Route path="/cabinet" />
      </Routes>
    </>
  )
}

export default App;
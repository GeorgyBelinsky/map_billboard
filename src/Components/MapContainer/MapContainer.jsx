import './index.css';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

import marker_img from '../../assets/pngegg.png';
import picture from '../../assets/picture.png';

import PopupContent from '../PopUpContent/PopUpContent';
import BuyForm from '../BuyForm/BuyForm';
import Actions from '../Actions/Actions';

const MapContainer = ({ markers , fetchData}) => {
    const mapPlacer = useRef(null);
    const [selectedMarkers, setSelectedMarkers]= useState([]); 

    useEffect(() => {
        const apiKey = 'AAPK44735a5f9a8c49c293f06ef401365ee0iFKx_2d7TjmyQXPR7lHNCLBn5vZRKOIImFBYiTBmupsJuhuLcBmT2ULNUbApHsWV';
        const basemapStyleURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/`;

        const map = new maplibregl.Map({
            container: mapPlacer.current,
            style: `${basemapStyleURL}${"arcgis/navigation"}?token=${apiKey}`,
            center: [50, 50],
            zoom: 1,
        });

        const openPopup = () => {
            
        }

        markers?.forEach((marker) => {
            const popup = new maplibregl.Popup();

            // Convert the React component to a DOM node
            const popupContentNode = document.createElement('div');
            const reactRoot = createRoot(popupContentNode);
            reactRoot.render(
            <PopupContent marker={marker} img={picture} setSelectedMarkers={setSelectedMarkers}/>
            );

            // Set the DOM node as the content of the Popup
            popup.setDOMContent(popupContentNode);

            const markerInstance = new maplibregl.Marker({ element: customMarker(), })
            .setLngLat([marker.longitude, marker.latitude])
            .setPopup(popup)
            .addTo(map);
        });

        return () => map.remove();
    }, [markers]);

    const customMarker = () => {
        const imgMarker = document.createElement('img');
        imgMarker.src = marker_img;
        imgMarker.alt = 'Billboard';
        imgMarker.style.width = '50px';
        imgMarker.style.height = '50px';

        return imgMarker;
    };

    return (
        <main className="main_container">
            <div className="mapWrapper" ref={mapPlacer}></div>
            <BuyForm selectedMarkers={selectedMarkers} setSelectedMarkers={setSelectedMarkers} 
            markers={markers} fetchData={fetchData}/>
            <Actions markers={markers}/>
        </main>
    );
}

export default MapContainer;
import './index.css';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

import marker_img from '../../assets/pngegg.png';
import picture from '../../assets/picture.png';

import PopupContent from '../PopUpContent/PopUpContent';
import BuyForm from '../BuyForm/BuyForm';
import Actions from '../Actions/Actions';

const MapContainer = ({ markers, fetchData }) => {
    const mapPlacer = useRef(null);
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const [mapInstance, setMapInstance] = useState(null); // State to store map instance
    const [markerInstances, setMarkerInstances] = useState([]); // State to store marker instances
    const [currentPopup, setCurrentPopup] = useState(null); // State to store the currently open popup

    useEffect(() => {
        const apiKey = 'AAPK44735a5f9a8c49c293f06ef401365ee0iFKx_2d7TjmyQXPR7lHNCLBn5vZRKOIImFBYiTBmupsJuhuLcBmT2ULNUbApHsWV';
        const basemapStyleURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/`;

        const map = new maplibregl.Map({
            container: mapPlacer.current,
            style: `${basemapStyleURL}${"arcgis/navigation"}?token=${apiKey}`,
            center: [50, 50],
            zoom: 1,
        });

        // Set the map instance in state
        setMapInstance(map);

        const markerInstancesArray = markers?.map(marker => {
            const popup = new maplibregl.Popup();
            const popupContentNode = document.createElement('div');
            const reactRoot = createRoot(popupContentNode);
            reactRoot.render(
                <PopupContent marker={marker} img={picture} setSelectedMarkers={setSelectedMarkers} />
            );
            popup.setDOMContent(popupContentNode);

            const markerInstance = new maplibregl.Marker({ element: customMarker(), })
                .setLngLat([marker.longitude, marker.latitude])
                .setPopup(popup)
                .addTo(map);
            
            return markerInstance;
        });

        // Store the marker instances in state
        setMarkerInstances(markerInstancesArray);

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

    const openPopup = (markerId) => {
        const marker = markers?.find(marker => marker.billboardId === markerId);

        if (mapInstance && marker) {
            // Find the corresponding marker instance
            const markerInstance = markerInstances.find(instance => instance.getLngLat().toArray().toString() === [marker.longitude, marker.latitude].toString());
    
            if (markerInstance) {
                const popup = markerInstance.getPopup();
    
                // Close any previously opened popup
                if (currentPopup) {
                    currentPopup.remove();
                }
    
                // If the popup exists, open it
                if (popup) {
                    popup.addTo(mapInstance);
                    setCurrentPopup(popup); // Set the current popup
                }
            }
        }
    };
    

    return (
        <main className="main_container">
            <div className="mapWrapper" ref={mapPlacer}></div>
            <BuyForm selectedMarkers={selectedMarkers} setSelectedMarkers={setSelectedMarkers}
                markers={markers} fetchData={fetchData} />
            <Actions markers={markers} openPopup={openPopup} />
        </main>
    );
}

export default MapContainer;

import './index.css';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from "react";
import {createRoot}  from 'react-dom/client';

import marker_img from '../../assets/pngegg.png';

import PopupContent from '../PopUpContent/PopUpContent';
import BuyForm from '../BuyForm/BuyForm';

const MapContainer = ({markers}) => {
    const mapPlacer = useRef(null);
    const [mapStyle, setMapStyle] = useState("arcgis/imagery");

    const handleMapStyleChange = (e) => {
        setMapStyle(e.target.value);
    };

    useEffect(() => {
        const apiKey = 'AAPK44735a5f9a8c49c293f06ef401365ee0iFKx_2d7TjmyQXPR7lHNCLBn5vZRKOIImFBYiTBmupsJuhuLcBmT2ULNUbApHsWV';
        const basemapStyleURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/`;

        const map = new maplibregl.Map({
            container: mapPlacer.current,
            style: `${basemapStyleURL}${mapStyle}?token=${apiKey}`,
            center: [36.2304, 49.9935],
            zoom: 12,
        });

        markers.forEach((marker) => {
            const popup = new maplibregl.Popup();

            // Convert the React component to a DOM node
            const popupContentNode = document.createElement('div');
            const reactRoot = createRoot(popupContentNode);
            reactRoot.render(<PopupContent title={marker.title} img ={marker_img} description={marker.description}/>);
            
            // Set the DOM node as the content of the Popup
            popup.setDOMContent(popupContentNode);
            
            new maplibregl.Marker({ element: customMarker(), })
                .setLngLat([marker.longitude, marker.latitude])
                .setPopup(popup)
                .addTo(map);
            
        });

        return () => map.remove();
    }, [mapStyle, markers]);

    const customMarker = () => {
        const imgMarker = document.createElement('img');
        imgMarker.src = marker_img;
        imgMarker.alt = 'Billboard';
        imgMarker.style.width = '50px';
        imgMarker.style.height = '50px';

        return imgMarker;
    };

    const basemapOptions = [
        "arcgis/outdoor",
        "arcgis/community",
        "arcgis/navigation",
        "arcgis/streets",
        "arcgis/streets-relief",
        "arcgis/imagery",
        "arcgis/oceans",
        "arcgis/topographic",
        "arcgis/light-gray",
        "arcgis/dark-gray",
        "arcgis/human-geography",
        "arcgis/charted-territory",
        "arcgis/nova",
        "osm/standard",
        "osm/navigation",
        "osm/streets",
        "osm/blueprint",
    ];

    return (
        <main style={{ width: "100%", height: "100vh"}}>
                <div className="mapWrapper" ref={mapPlacer}></div>

            <div className="basemapsWrapper">
                <select onChange={handleMapStyleChange} value={mapStyle} className="basemaps">
                    {basemapOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <BuyForm className="buy_button" />
        </main>
    );
}

export default MapContainer;
import './index.css';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

import marker_img from '../../assets/pngegg.png';
import picture from '../../assets/picture.png';

import PopupContent from '../PopUpContent/PopUpContent';
import BuyForm from '../BuyForm/BuyForm';
import Actions from '../Actions/Actions';
import CreateBillboard from '../CreateBillboard/CreateBillboard';

const MapContainer = ({ markers, fetchData }) => {
    const mapPlacer = useRef(null);
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const [mapInstance, setMapInstance] = useState(null);
    const [markerInstances, setMarkerInstances] = useState([]);
    const [currentPopup, setCurrentPopup] = useState(null);

    const placingMarkerRef = useRef(false);
    const [markerCoordinates, setMarkerCoordinates] = useState({ longitude: null, latitude: null });

    useEffect(() => {
        const basemapStyleURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/`;

        const map = new maplibregl.Map({
            container: mapPlacer.current,
            style: `${basemapStyleURL}${"arcgis/navigation"}?token=${import.meta.env.VITE_APP_API_KEY}`,
            center: [50, 50],
            zoom: 1,
        });

        setMapInstance(map);

        const markerInstancesArray = markers?.map(marker => {
            const popup = new maplibregl.Popup();
            const popupContentNode = document.createElement('div');
            const reactRoot = createRoot(popupContentNode);
            reactRoot.render(
                <PopupContent marker={marker} img={picture} setSelectedMarkers={setSelectedMarkers} />
            );
            popup.setDOMContent(popupContentNode);

            const markerInstance = new maplibregl.Marker({ element: customMarker()})
                .setLngLat([marker.longitude, marker.latitude])
                .setPopup(popup)
                .addTo(map);

            popup.on('open', () => {
                setCurrentPopup(popup);
            });

            return markerInstance;
        });

        setMarkerInstances(markerInstancesArray);

        map.on('click', (e) => {
            if (placingMarkerRef.current) {
                const { lng, lat } = e.lngLat;
                setMarkerCoordinates({ longitude: lng, latitude: lat });
                addClickEffect(map, e.point);
                placingMarkerRef.current = false;
            }
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

    const openPopup = (markerId) => {
        const marker = markers?.find(marker => marker.billboardId === markerId);
        if (mapInstance && marker) {
            const markerInstance = markerInstances.find(instance => instance.getLngLat().toArray().toString() === [marker.longitude, marker.latitude].toString());

            if (markerInstance) {
                const popup = markerInstance.getPopup();

                if (currentPopup) {
                    currentPopup.remove();
                }

                if (popup) {
                    popup.addTo(mapInstance);
                    setCurrentPopup(popup);

                    mapInstance.flyTo({
                        center: [marker.longitude, marker.latitude],
                        zoom: 15,
                        essential: true,
                        duration: 1000
                    });
                }
            }
        }
    };

    const handleCoordinatesSelect = () => {
        placingMarkerRef.current = true;
        if (mapInstance) {
            mapInstance.getCanvas().style.cursor = 'pointer';
        }
    };

    const addClickEffect = (map, point) => {
        const circle = document.createElement('div');
        circle.className = 'map-click-circle';
        circle.style.left = `${point.x}px`;
        circle.style.top = `${point.y}px`;

        map.getContainer().appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 800);
    };

    return (
        <main className="main_container">
            <div className="mapWrapper" ref={mapPlacer}></div>
            <CreateBillboard onCoordinatesSelect={handleCoordinatesSelect} coordinates={markerCoordinates} />
            <BuyForm selectedMarkers={selectedMarkers} setSelectedMarkers={setSelectedMarkers} markers={markers} fetchData={fetchData} />
            <Actions markers={markers} openPopup={openPopup} />
        </main>
    );
}

export default MapContainer;

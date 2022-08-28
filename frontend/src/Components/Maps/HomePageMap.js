import styled from "styled-components";
import Map, { NavigationControl, GeolocateControl, Marker } from 'react-map-gl';
import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import GeocoderControl from "./GeocoderControl";
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

const HomePageMap = () => {

    const {
        state:{mapLocation},
        actions:{updateMapLocation},
    } = useContext(GlobalStates);

    return(
        <>
            <Map
                initialViewState={{
                    longitude: mapLocation.lng,
                    latitude: mapLocation.lat,
                    zoom:13,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={TOKEN}
            >
                <Marker
                latitude={mapLocation.lat}
                longitude={mapLocation.lng}
                />
                <NavigationControl position="bottom-right"/>
                <GeolocateControl
                    position="bottom-left"
                    trackUserLocation={(e) => {
                        updateMapLocation({lng:e.coords.longitude,lat:e.coords.latitude})
                    }}
                />
                <GeocoderControl/>
            </Map>
        </>
    )
}

export default HomePageMap;
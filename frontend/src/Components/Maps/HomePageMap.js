import styled from "styled-components";
import Map from 'react-map-gl';
import { GeolocateControl } from "react-map-gl";

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

const HomePageMap = () => {

    return(
        <>
            <Map
                initialViewState={{
                    longitude: -79.4512,
                    latitude: 43.6568,
                    zoom:13,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
            >
                <GeolocateControl 
                    
                />
            </Map>
        </>
    )
}

export default HomePageMap;
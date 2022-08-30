import styled from "styled-components";
import Map, {
    Marker,
    NavigationControl,
    GeolocateControl
} from 'react-map-gl';
import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import GeocoderControl from "./GeocoderControl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ModalStateContext } from "../../ModalStateContext";

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

const HomePageMap = () => {

    const {
        state:{mapLocation,allParkingLotsDataHasLoaded,allParkingLotsData},
        actions:{updateMapLocation},
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal},
    } = useContext(ModalStateContext);

    if(allParkingLotsDataHasLoaded) {

        const pins = allParkingLotsData.map((parkingLot, index) => {
            return(
                <Marker
                key={`marker-${index}`}
                longitude={parkingLot.coords.longitude}
                latitude={parkingLot.coords.latitude}
                anchor="bottom"
                onClick = {(e) => {
                    e.originalEvent.stopPropagation();
                    ShowErrorModal({data:"Test"});
                }}
                >
                </Marker>
            )
        }) 
    
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
                    {pins}
                </Map>
            </>
        )
    } else {
        return(
            <div></div>
        )
    }
    
}

export default HomePageMap;
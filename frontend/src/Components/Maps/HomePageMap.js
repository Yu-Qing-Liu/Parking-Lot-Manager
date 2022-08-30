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
        actions:{ShowPaymentModal},
    } = useContext(ModalStateContext);

    if(allParkingLotsDataHasLoaded) {

        let markers = allParkingLotsData.map((parkingLot, index) => {
            return(
                <Marker
                key={`marker-${index}`}
                scale={0.75}
                longitude={parkingLot.coords.longitude}
                latitude={parkingLot.coords.latitude}
                anchor="bottom"
                onClick = {(e) => {
                    e.originalEvent.stopPropagation();
                    ShowPaymentModal({data:parkingLot});
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
                        zoom:3,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={TOKEN}
                >
                    <Marker
                    color={"#008b02"}
                    scale={0.5}
                    latitude={mapLocation.lat}
                    longitude={mapLocation.lng}
                    >
                    </Marker>
                    <NavigationControl position="bottom-right"/>
                    <GeolocateControl
                        position="bottom-left"
                        trackUserLocation={(e) => {
                            updateMapLocation({lng:e.coords.longitude,lat:e.coords.latitude})
                        }}
                    />
                    <GeocoderControl/>
                    {markers}
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
import styled from "styled-components";
import SideBar from "../Components/HomePage/SideBar";
import Map from "react-map-gl";
import SignInModal from "../Components/Modals/SignInModal";
import RegistrationModal from "../Components/Modals/RegistrationModal";
import ErrorModal from "../Components/Modals/ErrorModal";

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

const HomePage = () => {
    return(
        <>
            <SignInModal></SignInModal>
            <RegistrationModal></RegistrationModal>
            <ErrorModal></ErrorModal>
            <SideBar></SideBar>
            <MapContainer>
                {
                    /*
                        <Map
                            initialViewState={{
                            longitude: -79.4512,
                            latitude: 43.6568,
                            zoom: 13
                            }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={TOKEN}
                        >
                        </Map>
                    */
                }
            </MapContainer>
        </>
    )
}

const MapContainer = styled.div`
    width:80vw;
    height:95vh;
    position:absolute;
    top:6.6vh;
    left: 20.1vw;
`

export default HomePage;
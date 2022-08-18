import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import Map from "react-map-gl";
import SignInModal from "../Modals/SignInModal";


const TOKEN = "fetch-token";

const HomePage = () => {

    return(
        <>
            <SignInModal></SignInModal>
            <Header/>
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
import styled from "styled-components";
import AccountInformationPanel from "../AccountInformationPanel"
import Map from "react-map-gl";

const ProfileHome = () => {

    const TOKEN = process.env.REACT_APP_MapboxAccessToken;
    
    return(
        <>
            <AccountInformationPanel></AccountInformationPanel>
            <Wrapper>
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
            </Wrapper>
        </>
        
    )

}

const Wrapper = styled.div`
    position:absolute;
    left: 20vw;
    top: 6.6vh;
    width: 80vw;
    height: 95vh;
    background-color: transparent;
    z-index: 1;
`

export default ProfileHome;
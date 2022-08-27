import styled from "styled-components";
import SideBar from "../Components/HomePage/SideBar";
import SignInModal from "../Components/Modals/SignInModal";
import RegistrationModal from "../Components/Modals/RegistrationModal";
import HomePageMap from "../Components/Maps/HomePageMap";

const HomePage = () => {
    return(
        <>
            <SignInModal></SignInModal>
            <RegistrationModal></RegistrationModal>
            <SideBar></SideBar>
            <MapContainer>
                <HomePageMap></HomePageMap>
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
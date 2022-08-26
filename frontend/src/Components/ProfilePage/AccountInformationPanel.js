import { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalStates } from "../../GlobalStates";
import {MdEmail} from "react-icons/md";
import {CircularProgress} from "@mui/material";
import {MdAccountCircle} from "react-icons/md";
import {FaAddressCard} from "react-icons/fa";
import {FaCity} from "react-icons/fa";
import {GiMailbox} from "react-icons/gi";
import {GiPlanetConquest} from "react-icons/gi";
import {BsFillTelephoneFill} from "react-icons/bs";

const AccountInformationPanel = () => {

    const {
        state:{profileData}
    } = useContext(GlobalStates);

    return(
        <Wrapper>
            <Container>
                <InfoContainer>
                    <StyledEmailIcon></StyledEmailIcon>
                    <StyledInfoText>Email:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.email}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledPhoneIcon></StyledPhoneIcon>
                    <StyledInfoText>Phone Number:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.phoneNumber}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledProfileIcon></StyledProfileIcon>
                    <StyledInfoText>First Name:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.firstName}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledProfileIcon></StyledProfileIcon>
                    <StyledInfoText>Last Name:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.lastName}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledAddressIcon></StyledAddressIcon>
                    <StyledInfoText>Address:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.address}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledCityIcon></StyledCityIcon>
                    <StyledInfoText>City:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.city}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledMailBoxIcon></StyledMailBoxIcon>
                    <StyledInfoText>Postal Code:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.postalCode}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
                <InfoContainer>
                    <StyledCountryIcon></StyledCountryIcon>
                    <StyledInfoText>Country:&nbsp;</StyledInfoText>
                    {profileData.hasLoaded && (
                        <StyledInfoText1>{profileData.country}</StyledInfoText1>
                    )}
                    {!profileData.hasLoaded && (
                        <CircularProgress size="1vw"></CircularProgress>
                    )}
                </InfoContainer>
            </Container> 
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    left: 22vw;
    top: 10vh;
    width:20vw;
    height: 39vh;
    border-radius: 1.5vw;
    background-color: rgb(171,184,195,0.2);
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    margin-left: 2vw;
    margin-top:2vh;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StyledInfoText = styled.span`
    margin-top: 1vh;
    margin-bottom: 1vh;
`

const StyledInfoText1 = styled.span`
    margin-top: 1vh;
    margin-bottom: 1vh;
    color:grey;
`

const StyledEmailIcon = styled(MdEmail)`
    margin-right: 1vw;
`
const StyledPhoneIcon = styled(BsFillTelephoneFill)`
    margin-right: 1vw;
`
const StyledProfileIcon = styled(MdAccountCircle)`
    margin-right: 1vw;
`
const StyledAddressIcon = styled(FaAddressCard)`
    margin-right: 1vw;
`
const StyledCityIcon = styled(FaCity)`
    margin-right: 1vw;
`
const StyledMailBoxIcon = styled(GiMailbox)`
    margin-right: 1vw;
`
const StyledCountryIcon = styled(GiPlanetConquest)`
    margin-right: 1vw;
`

export default AccountInformationPanel;
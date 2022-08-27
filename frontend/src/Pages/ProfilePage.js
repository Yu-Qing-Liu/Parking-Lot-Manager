import styled from "styled-components";
import SideBar from "../Components/ProfilePage/SideBar";
import ProfilePageManager from "../Components/ProfilePage/ProfilePageManager";
import { GlobalStates } from "../GlobalStates";
import { useContext, useEffect } from "react";
import ErrorModal from "../Components/Modals/ErrorModal";
import EditParkingLotModal from "../Components/Modals/EditParkingLotModal";

const ProfilePage = () => {

    const {
        actions:{updateProfileData},
        state:{currentUserData}
    } = useContext(GlobalStates);

    useEffect(() => {
        if(currentUserData.hasLoaded && currentUserData.exists) {
            fetch(`/getUser/${currentUserData.data.uid}`)
            .then(res => res.json())
            .then((data) => {
                updateProfileData({
                    email:data.userData.email,
                    phoneNumber:data.userData.phoneNumber,
                    firstName:data.userData.firstName,
                    lastName:data.userData.lastName,
                    address:data.userData.address,
                    city:data.userData.city,
                    postalCode:data.userData.postalCode,
                    country:data.userData.country,
                })
            })
        }
    }, [currentUserData.hasLoaded && currentUserData.exists]);

    return(
        <>
            <EditParkingLotModal></EditParkingLotModal>
            <ErrorModal></ErrorModal>
            <SideBar></SideBar>
            <ProfilePageManager></ProfilePageManager>
        </>
    )
}

export default ProfilePage;
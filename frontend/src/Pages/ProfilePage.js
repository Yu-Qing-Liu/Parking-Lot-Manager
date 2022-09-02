import styled from "styled-components";
import SideBar from "../Components/ProfilePage/SideBar";
import ProfilePageManager from "../Components/ProfilePage/ProfilePageManager";
import { GlobalStates } from "../GlobalStates";
import { useContext, useEffect } from "react";
import { ModalStateContext } from "../ModalStateContext";
import EditParkingLotModal from "../Components/Modals/EditParkingLotModal";

const ProfilePage = () => {

    const {
        state:{currentUserData,profileData},
        actions:{updateProfileData},
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal,CloseLoadingModal,ShowLoadingModal},
    } = useContext(ModalStateContext);

    useEffect(() => {
        if(currentUserData.hasLoaded && currentUserData.exists) {
            ShowLoadingModal();
            fetch(`/getUser/${currentUserData.data.uid}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === "success") {
                    updateProfileData({
                        email:data.userData.email,
                        phoneNumber:data.userData.phoneNumber,
                        firstName:data.userData.firstName,
                        lastName:data.userData.lastName,
                        address:data.userData.address,
                        city:data.userData.city,
                        postalCode:data.userData.postalCode,
                        country:data.userData.country,
                        balance:data.userData.balance,
                    })
                    CloseLoadingModal();
                } else {
                    CloseLoadingModal();
                    ShowErrorModal({data:data.error});
                }
                
            })
            .catch((err) => {
                CloseLoadingModal();
                ShowErrorModal({data:err.message});
            })
        }
    }, [currentUserData.hasLoaded && currentUserData.exists]);

    return(
        <>
            <EditParkingLotModal></EditParkingLotModal>
            <SideBar></SideBar>
            {profileData.hasLoaded ? (
                <ProfilePageManager></ProfilePageManager>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default ProfilePage;
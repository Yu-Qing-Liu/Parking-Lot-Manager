import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import ProfileHome from "./ProfileTabs/ProfileHome";
import ProfileAccount from "./ProfileTabs/ProfileAccount";
import ProfileParkingLot from "./ProfileTabs/ProfileParkingLot";
import ProfileManageParkingLot from "./ProfileTabs/ProfileManageParkingLot";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ModalStateContext } from "../../ModalStateContext";
import ProfileBalance from "./ProfileTabs/ProfileBalance";

const ProfilePageManager = () => {

    let { uid } = useParams();

    const {
        state:{profilePageTab,profileData,refetchingParkingLots},
        actions:{updateParkingLots,updateAllParkingLotsData},
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal,CloseLoadingModal,ShowLoadingModal},
    } = useContext(ModalStateContext);

    useEffect(() => {
        
        ShowLoadingModal();
        fetch(`/getParkingLots/${uid}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status === "success") {
                updateParkingLots({data:data.data});
                fetch("/getAllParkingLots")
                .then(res => res.json())
                .then((data) => {
                    if(data.status === "success") {
                        updateAllParkingLotsData({data:data.parkingLots});
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
            } else {
                CloseLoadingModal();
                ShowErrorModal({data:data.error});
            }
        })
        .catch((err) => {
            CloseLoadingModal();
            ShowErrorModal({data:err.message});
        })
        
    }, [refetchingParkingLots]);


    switch(profilePageTab) {
        case "Home": {
            return(
                <ProfileHome></ProfileHome>
            )
        }
        case "Account": {
            return(
                <ProfileAccount></ProfileAccount>
            )
        }
        case "Create Parking Lot": {
            return (
                <ProfileParkingLot></ProfileParkingLot>
            )
        }
        case "Manage Parking Lot": {
            return(
                <ProfileManageParkingLot></ProfileManageParkingLot>
            )
        }
        case "Balance": {
            return(
                <ProfileBalance></ProfileBalance>
            )
        }
    }

    
}

export default ProfilePageManager;
import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import ProfileHome from "./ProfileTabs/ProfileHome";
import ProfileAccount from "./ProfileTabs/ProfileAccount";
import ProfileParkingLot from "./ProfileTabs/ProfileParkingLot";
import ProfileManageParkingLot from "./ProfileTabs/ProfileManageParkingLot";

const ProfilePageManager = () => {

    const {
        state:{profilePageTab},
    } = useContext(GlobalStates);


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
    }

    
}

export default ProfilePageManager;
import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import ProfileHome from "./ProfileHome";
import ProfileAccount from "./ProfileAccount";

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
    }

    
}

export default ProfilePageManager;
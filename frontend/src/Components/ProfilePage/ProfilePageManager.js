import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";

const ProfilePageManager = () => {

    const {
        state:{profilePageTab},
        action:{updateProfilePageTab},
    } = useContext(GlobalStates);

    return(
        <div>Test</div>
    )
}

export default ProfilePageManager;
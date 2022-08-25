import styled from "styled-components";
import SideBar from "../Components/ProfilePage/SideBar";
import AccountInformationPanel from "../Components/ProfilePage/AccountInformationPanel";
import ProfilePageManager from "../Components/ProfilePage/ProfilePageManager";

const ProfilePage = () => {
    return(
        <>
            <SideBar></SideBar>
            <AccountInformationPanel></AccountInformationPanel>
        </>
    )
}

export default ProfilePage;
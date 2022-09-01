import styled from "styled-components";
import { ModalStateContext } from "./ModalStateContext";
import { useContext } from "react";
import {GlobalStates} from "./GlobalStates";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {

    let history = useHistory();

    const {
        actions:{ShowSignInModal,ShowLoadingModal,CloseLoadingModal},
    } = useContext(ModalStateContext);

    const {
        actions:{updateCurrentUserData},
        state:{currentUserData}
    } = useContext(GlobalStates);

    return(
        <StyledHeader>
            <StyledTitle>Parking Lot Manager</StyledTitle>
            <ButtonContainer>
                {!currentUserData.exists && (
                    <StyledButton onClick={(e) => {
                        e.preventDefault();
                        ShowSignInModal();
                    }}>
                        Sign In
                    </StyledButton>
                )}
                {currentUserData.exists && (
                    <>  
                        <StyledLink to={"/"}>Homepage</StyledLink>
                        <StyledLink1 to={`/profile/${currentUserData.data.uid}`}>Profile</StyledLink1>
                        <StyledButton onClick={(e) => {
                            e.preventDefault();
                            ShowLoadingModal();
                            const auth = getAuth();
                            signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                CloseLoadingModal();
                                history.push("/");
                                updateCurrentUserData({data:null,exists:false});
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }}>
                            Sign Out
                        </StyledButton>
                    </>
                )}
            </ButtonContainer>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #bbdefb;
`

const StyledTitle = styled.h1`
    margin:0px;
    color:#0d47a1;
    margin-left: 1vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px #bbdefb solid;
`

const StyledButton = styled.button`
    border-width: 0px;
    background-color: #0d47a1;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const StyledLink = styled(Link)`
    border-width: 0px;
    background-color: #0d47a1;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`

const StyledLink1 = styled(Link)`
    border-width: 0px;
    background-color: #0d47a1;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-left: 2px #bbdefb solid;
    border-right: 2px #bbdefb solid;
`

export default Header;
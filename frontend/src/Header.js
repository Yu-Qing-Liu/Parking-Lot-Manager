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
                <StyledLink to={"/"}>Homepage</StyledLink>
                <StyledLink1 to={"/approval"}>Confirm Payment</StyledLink1>
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
                        <StyledLink2 to={`/profile/${currentUserData.data.uid}`}>Profile</StyledLink2>
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
    background: #4087BF;
    background: -moz-linear-gradient(top, #4087BF 0%, #79ABD2 50%, #B3CFE5 100%);
    background: -webkit-linear-gradient(top, #4087BF 0%, #79ABD2 50%, #B3CFE5 100%);
    background: linear-gradient(to bottom, #4087BF 0%, #79ABD2 50%, #B3CFE5 100%);
`

const StyledTitle = styled.h1`
    margin:0px;
    color:white;
    margin-left: 1vw;
    margin-top: 1vh;
    margin-bottom: 0.40vh;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledButton = styled.button`
    border-width: 0px;
    background-color: transparent;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: rgb(64,135,191,0.5);
    }
`

const StyledLink = styled(Link)`
    border-width: 0px;
    background-color: transparent;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background-color: rgb(64,135,191,0.5);
    }
`

const StyledLink1 = styled(Link)`
    border-width: 0px;
    background-color: transparent;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background-color: rgb(64,135,191,0.5);
    }
`

const StyledLink2 = styled(Link)`
    border-width: 0px;
    background-color: transparent;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background-color: rgb(64,135,191,0.5);
    }
`

export default Header;
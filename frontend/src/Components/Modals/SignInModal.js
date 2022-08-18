import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import { useHistory } from "react-router-dom";

const SignInModal = () => {

    let history = useHistory();

    const {
        state:{DisplaySignInModal},
        actions:{CloseSignInModal,ShowRegistrationModal,ShowErrorModal},
    } = useContext(ModalStateContext);

    return(
        <Dialog
        open = {DisplaySignInModal}
        onClose = {() => CloseSignInModal()}
        >
            <Wrapper>
                <Container>
                    <StyledTitle>Sign In</StyledTitle>
                    <InputContainer>
                        <StyledLabel id={"signInUsername"}>Username</StyledLabel>
                        <StyledInput></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel id={"signInPassword"}>Password</StyledLabel>
                        <StyledInput></StyledInput>
                    </InputContainer>
                    <StyledButton0 onClick={(e) => {
                            e.preventDefault();
                            fetch('/signIn', {
                                method: 'GET',
                                headers: {
                                    Accept: "application/json",
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    Username: document.getElementById("signInUsername").value,
                                    Password: document.getElementById("signInPassword").value,
                                })
                            })
                            .then(res => res.json())
                            .then((response) => {
                                CloseSignInModal();
                                history.push(`/User/${response.data.UserId}`);
                            })
                            .catch((err) => {
                                ShowErrorModal(err);
                            })
                        }}>
                        Sign In
                    </StyledButton0>
                    <Styledp>Don't Have An Account?</Styledp>
                    <ButtonContainer>
                        <StyledButton onClick={(e) => {
                            e.preventDefault();
                            CloseSignInModal();
                            ShowRegistrationModal();
                        }}>
                        Create An Account
                        </StyledButton>
                        <StyledButton2 onClick={(e) => {
                            e.preventDefault();
                            CloseSignInModal();
                        }}>
                            Cancel
                        </StyledButton2>
                    </ButtonContainer>
                </Container>
            </Wrapper>
        </Dialog>
    )
    
}

const StyledTitle = styled.h1`
    color:#0d47a1;
    margin-top:2vh;
    margin-bottom:0vh;
    font-size: 3vw;
`

const Wrapper = styled.div`
    width: 25vw;
    height: 60vh;
`

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2vw;
`

const StyledLabel = styled.label`
    font-size: xx-large;
`

const StyledInput = styled.input`
    padding-right: 6vw;
    font-size:x-large;
    margin-top:1vh;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 2vh;
`

const Styledp = styled.p`
    font-size:large;
`

const StyledButton = styled.button`
    border-width: 0px;
    padding:1.5vh 2vw 1.5vh 2vw;
    background-color: #0d47a1;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const StyledButton2 = styled.button`
    border-width: 0px;
    padding:1.5vh 2vw 1.5vh 2vw;
    background-color: red;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const StyledButton0 = styled.button`
    margin-top:3vh;
    border-width: 0px;
    padding:1.5vh 2vw 1.5vh 2vw;
    background-color: green;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const ButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width:21vw;
`

export default SignInModal;
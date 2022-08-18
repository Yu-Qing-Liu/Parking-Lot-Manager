import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const RegistrationModal = () => {

    let history = useHistory();

    const {
        state:{DisplayRegistrationModal},
        actions:{CloseRegistrationModal,ShowSignInModal,ShowErrorModal},
    } = useContext(ModalStateContext);

    return(
        <Dialog
        open = {DisplayRegistrationModal}
        onClose = {() => CloseRegistrationModal()}
        >
            <Wrapper>
                <Container>
                    <StyledTitle>Create An Account</StyledTitle>
                    <InputContainer>
                        <StyledLabel>Username</StyledLabel>
                        <StyledInput id={"username"}></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Password</StyledLabel>
                        <StyledInput id={"password"}></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Email</StyledLabel>
                        <StyledInput id={"email"}></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Address</StyledLabel>
                        <StyledInput id={"address"}></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Phone Number</StyledLabel>
                        <StyledInput id={"phone"}></StyledInput>
                    </InputContainer>
                    <Styledp></Styledp>
                    <ButtonContainer>
                        <StyledButton0 onClick={(e) => {
                            e.preventDefault();
                            fetch('/createUser', {
                                method: 'POST',
                                headers: {
                                    Accept: "application/json",
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    Username: document.getElementById("username").value,
                                    Password: document.getElementById("password").value,
                                    Email: document.getElementById("email").value,
                                    Address: document.getElementById("address").value,
                                    PhoneNumber: document.getElementById("phone").value
                                })
                            })
                            .then(res => res.json())
                            .then((response) => {
                                CloseRegistrationModal();
                                history.push(`/User/${response.data.UserId}`);
                            })
                            .catch((err) => {
                                ShowErrorModal(err);
                            })
                        }}>
                        Create
                        </StyledButton0>
                        <StyledButton onClick={(e) => {
                            e.preventDefault();
                            CloseRegistrationModal();
                            ShowSignInModal();
                        }}>
                        Sign In
                        </StyledButton>
                        <StyledButton2 onClick={(e) => {
                            e.preventDefault();
                            CloseRegistrationModal();
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
    width: 30vw;
    height: 70vh;
`

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2vw;
`

const StyledLabel = styled.label`
    font-size: large;
`

const StyledInput = styled.input`
    padding-right: 7vw;
    font-size:large;
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
    width:26vw;
`

export default RegistrationModal;
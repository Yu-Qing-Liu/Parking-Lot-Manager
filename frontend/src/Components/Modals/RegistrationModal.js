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
                <Container onSubmit= {(e) => {
                        e.preventDefault();
                        fetch('/createUser', {
                            method: 'POST',
                            headers: {
                                Accept: "application/json",
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                Address: document.getElementById("address").value,
                                PhoneNumber: document.getElementById("phone").value,
                                Email: document.getElementById("email").value,
                                Password: document.getElementById("password").value,
                                ConfirmPassword: document.getElementById("ConfirmPassword").value
                            })
                        })
                        .then(res => res.json())
                        .then((response) => {
                            CloseRegistrationModal();
                            history.push(`/User/${response.data.UserId}`);
                        })
                        .catch((err) => {
                            ShowErrorModal(err);
                        })
                    }}
                    >
                    <StyledTitle>Create An Account</StyledTitle>
                    <InputContainer>
                        <StyledLabel>Address</StyledLabel>
                        <StyledInput id={"address"} placeholder="Address" required></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Phone Number</StyledLabel>
                        <StyledInput type={"tel"} id={"phone"} placeholder="xxx-xxx-xxxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Email</StyledLabel>
                        <StyledInput type={"email"} id={"email"} placeholder="Email" required></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Password</StyledLabel>
                        <StyledInput id={"password"} placeholder="Password" required></StyledInput>
                    </InputContainer>
                    <InputContainer>
                        <StyledLabel>Confirm Password</StyledLabel>
                        <StyledInput type={"password"} id={"ConfirmPassword"} placeholder="Confirm password" required></StyledInput>
                    </InputContainer>
                    <Styledp></Styledp>
                    <ButtonContainer>
                        <StyledButton0 type={"submit"}>
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
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    border-width: 0;
    font-size: large;
    margin-top:1vh;
    width: 18vw;
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
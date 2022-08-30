import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';

const ErrorModal = () => {
    const {
        state:{DisplayErrorModal,ErrorModalContent},
        actions:{CloseErrorModal},
    } = useContext(ModalStateContext);

    return(
        <Dialog
        open = {DisplayErrorModal}
        onClose = {() => CloseErrorModal()}
        >
            <Wrapper>
                <Container>
                    <StyledTitle>It Seems That An Error Occured</StyledTitle>
                    <Styledp>{ErrorModalContent}</Styledp>
                    <StyledButton2 onClick={(e) => {
                        e.preventDefault()
                        CloseErrorModal();
                    }}>
                        Exit
                    </StyledButton2>
                </Container>
            </Wrapper>
        </Dialog>
    )
}

const StyledTitle = styled.h1`
    color:red;
    margin-top:2vh;
    margin-bottom:0vh;
    font-size: 1.5vw;
`

const Wrapper = styled.div`
    width: 26vw;
`

const StyledButton2 = styled.button`
    margin-bottom: 2.5vh;
    border-width: 0px;
    padding:1.5vh 2vw 1.5vh 2vw;
    background-color: red;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2vw;
`

const Styledp = styled.p`
    font-size:large;
    margin-right: 1vw;
`

export default ErrorModal;
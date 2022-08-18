import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';

const SignInModal = () => {

    const {
        state:{DisplaySignInModal},
        actions:{CloseSignInModal},
    } = useContext(ModalStateContext);

    return(
        <Dialog
        open = {DisplaySignInModal}
        onClose = {() => CloseSignInModal()}
        >
            <StyledTitle>Sign In</StyledTitle>
        </Dialog>
    )
    
}

const StyledTitle = styled.h1`

`

export default SignInModal;
import { Backdrop } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import { CircularProgress } from "@mui/material";

const LoadingModal = () => {
    const {
        state:{DisplayLoadingModal},
    } = useContext(ModalStateContext);

    return(
        <Backdrop
        sx = {{zIndex: 1301}}
        open = {DisplayLoadingModal}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingModal;
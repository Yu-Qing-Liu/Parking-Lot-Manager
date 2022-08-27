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
        sx = {{zIndex: (theme) => theme.zIndex.drawer + 1}}
        open = {DisplayLoadingModal}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingModal;
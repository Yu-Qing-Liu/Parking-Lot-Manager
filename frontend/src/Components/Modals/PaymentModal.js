import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import TimePicker from 'react-time-picker';
import { useState } from "react";
import { GlobalStates } from "../../GlobalStates";

const PaymentModal = () => {

    const {
        state:{DisplayPaymentModal,PaymentModalData},
        actions:{ClosePaymentModal,ShowErrorModal,ShowLoadingModal,CloseLoadingModal},
    } = useContext(ModalStateContext);

    const {
        state:{refetchingParkingLots},
        actions:{refetchParkingLots},
    } = useContext(GlobalStates);

    if(PaymentModalData !== null) {
        console.log(PaymentModalData);
        return(
            <Dialog
            open = {DisplayPaymentModal}
            onClose = {() => ClosePaymentModal()}
            >
                <Wrapper>

                </Wrapper>
            </Dialog>
        )
    } else {
        return(
            <div></div>
        )
    }
    
}

const StyledTitle = styled.h1`
    color:#0d47a1;
    margin-left: 1vw;
    margin-top:2vh;
    margin-bottom:0vh;
    font-size: 1.5vw;
`

const Wrapper = styled.form`
    width: 35vw;
    height: 58vh;
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
    width: 15vw;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 2vh;
    margin-left: 1vw;
    margin-right: 1.5vw;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledDaysContainer = styled.div`
    margin-left: 1vw;
    margin-top: 1vh;
`

const StyledButtonContainer = styled.div`
    margin-top: 3vh;
    margin-left: 1vw;
    margin-right: 1vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledSubmitButton = styled.button`
    padding: 1.5vh 2vw;
    background-color: rgb(13,71,161);
    color:white;
    font-weight: bold;
    border-width: 0;
    border-radius: 2vw;
    &:hover{
        background-color: rgb(13,71,161,0.7);
        cursor: pointer;
    }
`

const StyledCancelButton = styled.button`
    padding: 1.5vh 2vw;
    background-color: rgb(183,0,0);
    color:white;
    font-weight: bold;
    border-width: 0;
    border-radius: 2vw;
    &:hover{
        background-color: rgb(183,0,0,0.7);
        cursor: pointer;
    }
`


export default PaymentModal;
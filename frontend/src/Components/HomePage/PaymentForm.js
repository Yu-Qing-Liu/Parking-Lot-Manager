import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from "react";
import { GlobalStates } from "../../GlobalStates";
import moment from "moment";

const PaymentForm = ({date,uid,availableDates,appoitments}) => {

    const {
        actions:{updateAllParkingLotsData}
    } = useContext(GlobalStates);

    const {
        actions:{ClosePaymentModal,ShowErrorModal,ShowLoadingModal,CloseLoadingModal},
    } = useContext(ModalStateContext);

    return(
        <StyledForm
            onSubmit={(e) => {
                e.preventDefault();
                //Perform validations on date
                const today = moment();
                let valid = false;
                for(let i = 0; i < availableDates.length; i++) {
                    if(date.toLowerCase().includes(availableDates[i])) {
                        valid = true;
                        break;
                    }
                }
                appoitments.forEach((appoitment) => {
                    if(appoitment.date === date) {
                        valid = false;
                    }
                })
                if(!valid) {
                    ShowErrorModal({data:"Sorry, this day isn't available"});
                } else if(moment(date).isBefore(today)) {
                    ShowErrorModal({data:"Sorry, this day isn't available, the date you have selected is in the past"});
                } else {
                    ShowLoadingModal();
                    //Add date to booked dates
                    fetch(`/addAppointment/${uid}`, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            date:date,
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        if(data.status === "success") {
                            fetch("/getAllParkingLots")
                            .then(res => res.json())
                            .then((data) => {
                                if(data.status === "success") {
                                    updateAllParkingLotsData({data:data.parkingLots});
                                    CloseLoadingModal();
                                    ClosePaymentModal();
                                } else {
                                    CloseLoadingModal();
                                    ShowErrorModal({data:data.error});
                                }
                            })
                            .catch((err) => {
                                CloseLoadingModal();
                                ShowErrorModal({data:err.message});
                            })
                        } else {
                            CloseLoadingModal();
                            ShowErrorModal({data:data.error});
                        }
                    })
                    .catch((err) => {
                        CloseLoadingModal();
                        ShowErrorModal({data:err.message});
                    })
                }
            }}
        >
            <Wrapper>
            <InputContainer>
                <StyledLabel>Card Number</StyledLabel>
                <StyledInput id={"cardNumber"} placeholder="1234 1234 1234 1234" required></StyledInput>
            </InputContainer>
            <InputContainer2>
                <InputContainer>
                    <StyledLabel>Expiration</StyledLabel>
                    <StyledInput2 id={"expiration"} placeholder="MM/YY" required></StyledInput2>
                </InputContainer>
                <InputContainer>
                    <StyledLabel>CVC</StyledLabel>
                    <StyledInput2 id={"cvc"} placeholder="CVC" required></StyledInput2>
                </InputContainer>
            </InputContainer2>
            </Wrapper>
            <StyledButtonContainer>
                <StyledSubmitButton type="submit">Confirm Payment</StyledSubmitButton>
                <StyledCancelButton type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        ClosePaymentModal();
                    }}
                >
                    Cancel
                </StyledCancelButton>
            </StyledButtonContainer>
        </StyledForm>
        
    )
}

const StyledForm = styled.form`

`

const Wrapper = styled.div`
    width: 33vw;
    height: 18vh;
    margin-left: 1vw;
    margin-top: 2vh;
    background-color: rgb(13,71,161,0.05);
    display: flex;
    flex-direction: column;
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

const StyledInput2 = styled.input`
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    border-width: 0;
    font-size: large;
    margin-top:1vh;
    width: 5vw;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1vh;
    margin-left: 1vw;
`

const InputContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1vh;
    width: 15vw;
`

const StyledButtonContainer = styled.div`
    margin-top: 2vh;
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

export default PaymentForm;
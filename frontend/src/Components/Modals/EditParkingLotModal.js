import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import TimePicker from 'react-time-picker';
import { useState } from "react";
import { GlobalStates } from "../../GlobalStates";

const EditParkingLotModal = () => {

    const {
        state:{DisplayEditParkingLotModal,EditParkingLotModalData},
        actions:{CloseEditParkingLotModal,ShowErrorModal,ShowLoadingModal,CloseLoadingModal},
    } = useContext(ModalStateContext);

    const {
        state:{refetchingParkingLots},
        actions:{refetchParkingLots},
    } = useContext(GlobalStates);

    const [startTime, changeStartTime] = useState(null);
    const [endTime, changeEndTime] = useState(null);

    if(EditParkingLotModalData !== null) {
        return(
            <Dialog
            open = {DisplayEditParkingLotModal}
            onClose = {() => CloseEditParkingLotModal()}
            >
                <Wrapper onSubmit={(e) => {
                    e.preventDefault();
                    ShowLoadingModal();
                    let address = document.getElementById("modifyPLAddress").value;
                    let city = document.getElementById("modifyPLCity").value;
                    let country = document.getElementById("modifyPLCountry").value;
                    let days = {
                        monday:document.getElementById("mon").checked,
                        tuesday:document.getElementById("tue").checked,
                        wednesday:document.getElementById("wed").checked,
                        thursday:document.getElementById("thu").checked,
                        friday:document.getElementById("fri").checked,
                        saturday:document.getElementById("sat").checked,
                        sunday:document.getElementById("sun").checked,
                    }
                    let price = document.getElementById("modifyPrice").value;
                    let start = startTime === null ? EditParkingLotModalData.startTime : startTime;
                    let end = endTime === null ? EditParkingLotModalData.endTime : endTime;
                    fetch(`/updateParkingLot/${EditParkingLotModalData._id}`, {
                        method: 'PATCH',
                        headers: {
                            Accept: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            address:address,
                            city:city, 
                            country:country, 
                            startTime:start, 
                            endTime:end, 
                            days:days,
                            price:price,
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        if(data.status === "success") {
                            if(refetchingParkingLots) {
                                refetchParkingLots({data:false});
                            } else {
                                refetchParkingLots({data:true});
                            }
                            CloseEditParkingLotModal();
                        } else {
                            CloseLoadingModal();
                            ShowErrorModal({data:data.error});
                        }
                    })
                }}
                >
                    <StyledTitle>Edit Parking Lot Information</StyledTitle>
                    <StyledContainer>
                        <InputContainer>
                            <StyledLabel>Address</StyledLabel>
                            <StyledInput id={"modifyPLAddress"} placeholder={EditParkingLotModalData.address}></StyledInput>
                        </InputContainer>
                    </StyledContainer>
                    <StyledContainer>
                        <InputContainer>
                            <StyledLabel>City</StyledLabel>
                            <StyledInput id={"modifyPLCity"} placeholder={EditParkingLotModalData.city}></StyledInput>
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel>Country</StyledLabel>
                            <StyledInput id={"modifyPLCountry"} placeholder={EditParkingLotModalData.country}></StyledInput>
                        </InputContainer>
                    </StyledContainer>
                    <StyledContainer>
                        <InputContainer>
                            <StyledLabel>Available From</StyledLabel>
                            <StyledTimePicker onChange={changeStartTime} value={EditParkingLotModalData.startTime} />
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel>To</StyledLabel>
                            <StyledTimePicker onChange={changeEndTime} value={EditParkingLotModalData.endTime} />
                        </InputContainer>
                    </StyledContainer>
                    <StyledDaysContainer>
                        <StyledLabel>Days:</StyledLabel>
                    </StyledDaysContainer>
                    <StyledDaysContainer>
                        <StyledLabel>Mon</StyledLabel>
                        {EditParkingLotModalData.days.includes("monday") ? (
                            <StyledCheckBox id="mon" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="mon" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Tue</StyledLabel>
                        {EditParkingLotModalData.days.includes("tuesday") ? (
                            <StyledCheckBox id="tue" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="tue" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Wed</StyledLabel>
                        {EditParkingLotModalData.days.includes("wednesday") ? (
                            <StyledCheckBox id="wed" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="wed" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Thu</StyledLabel>
                        {EditParkingLotModalData.days.includes("thursday") ? (
                            <StyledCheckBox id="thu" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="thu" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Fri</StyledLabel>
                        {EditParkingLotModalData.days.includes("friday") ? (
                            <StyledCheckBox id="fri" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="fri" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Sat</StyledLabel>
                        {EditParkingLotModalData.days.includes("saturday") ? (
                            <StyledCheckBox id="sat" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="sat" type="checkbox"></StyledCheckBox>
                        )}
                        <StyledLabel>Sun</StyledLabel>
                        {EditParkingLotModalData.days.includes("sunday") ? (
                            <StyledCheckBox id="sun" type="checkbox" defaultChecked></StyledCheckBox>
                        ) : (
                            <StyledCheckBox id="sun" type="checkbox"></StyledCheckBox>
                        )} 
                    </StyledDaysContainer>
                    <StyledContainer>
                        <InputContainer>
                            <StyledLabel>Price</StyledLabel>
                            <StyledInput id={"modifyPrice"} placeholder={EditParkingLotModalData.price}></StyledInput>
                        </InputContainer>
                    </StyledContainer>
                    <StyledButtonContainer>
                        <StyledSubmitButton type="submit">Confirm</StyledSubmitButton>
                        <StyledCancelButton type="button" onClick={(e) => {
                            e.preventDefault();
                            CloseEditParkingLotModal();
                        }}>
                            Cancel
                        </StyledCancelButton>
                    </StyledButtonContainer>
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

const StyledTimePicker = styled(TimePicker)`
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    border-width: 0;
    margin-top:1vh;
`

const StyledDaysContainer = styled.div`
    margin-left: 1vw;
    margin-top: 1vh;
`

const StyledCheckBox = styled.input`
    margin-right: 1vw;
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


export default EditParkingLotModal;
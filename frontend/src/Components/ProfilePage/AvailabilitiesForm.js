import { useContext, useState } from "react";
import { GlobalStates } from "../../GlobalStates";
import { ModalStateContext } from "../../ModalStateContext";
import styled from "styled-components";
import TimePicker from 'react-time-picker';
import DayCheckBox from "./DayCheckBox";

const AvailabilitiesForm = () => {

    const [startTime, changeStartTime] = useState('00:00');
    const [endTime, changeEndTime] = useState('00:00');

    const {
        state:{profileData,parkingLotDays,currentUserData},
        actions:{updateParkingLotDays}
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal}
    } = useContext(ModalStateContext);

    return(
        <Wrapper onSubmit={(e) => {
            e.preventDefault();
            fetch(`/createParkingLot/${currentUserData.data.uid}`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country:(document.getElementById("parkingLotCountry").value !== "" ? document.getElementById("parkingLotCountry").value : profileData.country),
                    city:(document.getElementById("parkingLotCity").value !== "" ? document.getElementById("parkingLotCity").value : profileData.city),
                    address:(document.getElementById("parkingLotAddress").value !== "" ? document.getElementById("parkingLotAddress").value : profileData.address),
                    startTime:startTime,
                    endTime:endTime,
                    days:parkingLotDays,
                    price:(document.getElementById("parkingLotPrice").value),
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.status === "success") {
                    console.log(data);
                } else {
                    ShowErrorModal({data:data.error});
                }
            })
        }}>
            <StyledTitle>Create a parking lot</StyledTitle>
            <Container>
                <InputContainer>
                    <StyledLabel>Country</StyledLabel>
                    <StyledInput id={"parkingLotCountry"} placeholder={profileData.country}></StyledInput>
                </InputContainer>
                <InputContainer>
                    <StyledLabel>City</StyledLabel>
                    <StyledInput id={"parkingLotCity"} placeholder={profileData.city}></StyledInput>
                </InputContainer>
            </Container>
            <Container>
                <InputContainer>
                    <StyledLabel>Address</StyledLabel>
                    <StyledInput id={"parkingLotAddress"} placeholder={profileData.address}></StyledInput>
                </InputContainer>
            </Container>
            <Container>
                <InputContainer>
                    <StyledLabel>Available From</StyledLabel>
                    <StyledTimePicker onChange={changeStartTime} value={startTime} />
                </InputContainer>
                <InputContainer>
                    <StyledLabel>To</StyledLabel>
                    <StyledTimePicker onChange={changeEndTime} value={endTime} />
                </InputContainer>
            </Container>
            <StyledTitle2>Available on: </StyledTitle2>
            <DaysContainer>
                <DayCheckBox label={"Mondays"} id={"monday"} handleClick={() => updateParkingLotDays({...parkingLotDays, monday:!parkingLotDays.monday})}></DayCheckBox>
                <DayCheckBox label={"Tuesdays"} id={"tuesday"} handleClick={() => updateParkingLotDays({...parkingLotDays, tuesday:!parkingLotDays.tuesday})}></DayCheckBox>
                <DayCheckBox label={"Wednesday"} id={"wednesday"} handleClick={() => updateParkingLotDays({...parkingLotDays, wednesday:!parkingLotDays.wednesday})}></DayCheckBox>
                <DayCheckBox label={"Thursday"} id={"thursday"} handleClick={() => updateParkingLotDays({...parkingLotDays, thursday:!parkingLotDays.thursday})}></DayCheckBox>
                <DayCheckBox label={"Friday"} id={"friday"} handleClick={() => updateParkingLotDays({...parkingLotDays, friday:!parkingLotDays.friday})}></DayCheckBox>
                <DayCheckBox label={"Saturday"} id={"saturday"} handleClick={() => updateParkingLotDays({...parkingLotDays, saturday:!parkingLotDays.saturday})}></DayCheckBox>
                <DayCheckBox label={"Sunday"} id={"sunday"} handleClick={() => updateParkingLotDays({...parkingLotDays, sunday:!parkingLotDays.sunday})}></DayCheckBox>
            </DaysContainer>
            <Container>
                <InputContainer>
                    <StyledLabel>Price</StyledLabel>
                    <StyledInput id={"parkingLotPrice"} placeholder={"00.00"} required></StyledInput>
                </InputContainer>
            </Container>
            <InputContainer>
                <SubmitButton type="submit">Create Parking Lot</SubmitButton>
            </InputContainer>
        </Wrapper>
    )
}

const StyledTitle2 = styled.h3`
    margin:0;
    margin-top:2vh;
    margin-left: 2vw;
    font-weight: normal;
`

const StyledTitle = styled.h2`
    margin:0;
    margin-top: 2vh;
    margin-left: 2vw;
`

const Wrapper = styled.form`
    position: absolute;
    left:20vw;
    top:4vh;
    width: 52vw;
    height: 80vh;
    -webkit-box-shadow: 0px 0px 2px 0px #A6A6A6; 
    box-shadow: 0px 0px 2px 0px #A6A6A6;
    background-color: white;
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

const Container = styled.div`
    margin-left: 2vw;
    display: flex;
    flex-direction: row;
`

const DaysContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 2vh;
    margin-right: 4vw;
`

const StyledTimePicker = styled(TimePicker)`
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    border-width: 0;
    margin-top:1vh;
`

const StyledCheckBox = styled.input`

`

const SubmitButton = styled.button`
    margin-left: 2vw;
    margin-top: 1vh;
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 1vw;
    padding-right: 1vw;
    border-width: 0;
    border-radius: 1vw;
    background-color: rgb(0,139,2,0.9);
    color:white;
    font-weight: bold;
    font-size: large;
    &:hover {
        background-color: rgb(0,139,2,0.7);
        cursor: pointer;
    }
`

export default AvailabilitiesForm;
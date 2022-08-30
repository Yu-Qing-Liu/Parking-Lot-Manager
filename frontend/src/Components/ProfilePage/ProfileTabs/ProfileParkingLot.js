import styled from "styled-components";
import {useContext, useState} from 'react';
import { Calendar } from "react-multi-date-picker"
import AvailabilitiesForm from "../AvailabilitiesForm";
import { GlobalStates } from "../../../GlobalStates";

const ProfileParkingLot = () => {

    const {
        state:{parkingLotDays},
    } = useContext(GlobalStates);

    const [value, setValue] = useState(new Date());

    return(
        <Wrapper>
            <CalendarContainer>
                <Calendar 
                value={value}
                mapDays={({ date }) => {
                    let props ={}
                    let dayStrings = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
                    let styleDay = (dayString) => {
                        if(date.toDate().toDateString().split(" ")[0] === dayString) {
                            props.style = {
                                color:"white",
                                backgroundColor:"rgb(13,71,161,0.8)",
                            }
                        }

                    }
                    Object.values(parkingLotDays).forEach((bool,index) => {
                        if(bool) {
                            styleDay(dayStrings[index]);
                        }
                    }) 
                    return props;
                }}
                />
            </CalendarContainer>
            <AvailabilitiesForm></AvailabilitiesForm>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:absolute;
    left: 22vw;
    top: 9vh;
`

const CalendarContainer = styled.div`
    margin-top:4.2vh;
    margin-left: 1.2vw;
`

export default ProfileParkingLot;
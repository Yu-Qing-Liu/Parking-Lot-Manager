import styled from "styled-components";
import AccountInformationPanel from "../AccountInformationPanel"
import { GlobalStates } from "../../../GlobalStates";
import { ModalStateContext } from "../../../ModalStateContext";
import { useContext } from "react";
import { useEffect } from "react";
import Appointment from "../Appointment";
import { Calendar } from "react-multi-date-picker";
import { useState } from "react";
import moment from "moment";

const ProfileHome = () => {

    const {
        state:{parkingLotsHasLoaded,parkingLots,currentUserData,refetchingParkingLots},
        actions:{updateParkingLots,updateAllParkingLotsData},
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal,CloseLoadingModal,ShowLoadingModal},
    } = useContext(ModalStateContext);

    const [value, setValue] = useState(new Date());

    useEffect(() => {
        ShowLoadingModal();
        fetch(`/getParkingLots/${currentUserData.data.uid}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status === "success") {
                updateParkingLots({data:data.data});
                fetch("/getAllParkingLots")
                .then(res => res.json())
                .then((data) => {
                    if(data.status === "success") {
                        updateAllParkingLotsData({data:data.parkingLots});
                        CloseLoadingModal();
                    } else {
                        CloseLoadingModal();
                        ShowErrorModal({data:data.error});
                    }
                })
                
            } else {
                CloseLoadingModal();
                ShowErrorModal({data:data.error});
            }
        })
    }, [refetchingParkingLots]);
    
    if(parkingLotsHasLoaded && parkingLots !== null) {

        let appointmentsbyLot = parkingLots.map((parkingLot) => {
            return {appointments:parkingLot.bookedDates,address:`${parkingLot.address}, ${parkingLot.city}, ${parkingLot.country}`};
        })
        
        let dates = parkingLots.map((parkingLot) => {
            return(
                parkingLot.bookedDates.map((date) => {
                return date.date;
                })
            )
        }).flat()

        return(
            <>
                <AccountInformationPanel></AccountInformationPanel>
                <AppointmentContainer>
                    <Styledh1>Appointments</Styledh1>
                    <CalendarContainer>
                        <Calendar 
                        value={value}
                        onChange={setValue}
                        mapDays={({ date, today, isSameDate }) => {
                            const props = {};
                            // Disable dates by default
                            props.style = {
                                color:"black",
                            }
                            props.disabled = true;
                            // Style the current day
                            if (isSameDate(date, today)) {
                                props.style.color = "darkgreen"
                                props.style.backgroundColor = "lightGreen"
                            }
                            // Style bookedDays
                            dates.forEach((appoitmentDate) => {
                                if(appoitmentDate === moment(date.toString()).format('dddd DD MMMM YYYY')) {
                                    props.disabled = true;
                                    props.style = {
                                        color:"white",
                                        backgroundColor:"blue",
                                    }
                                }
                            })
                            return props;
                        }}
                        />
                    </CalendarContainer>
                    <Container>
                        {
                        appointmentsbyLot.map((parkingLot) => {
                            return(
                                <Appointment parkingLot={parkingLot}></Appointment>
                            )
                        })
                        }
                    </Container>
                </AppointmentContainer>
            </>
        )
    }
    

}

const AppointmentContainer = styled.div`
    position:absolute;
    left: 45vw;
    top: 10vh;
    width: 50vw;
    height: 86vh;
    -webkit-box-shadow: 0px 0px 5px 0px #8F8F8F; 
    box-shadow: 0px 0px 5px 0px #8F8F8F;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    z-index: 1;
`

const Container = styled.div`
    background-color: white;
    width: 50vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
`

const Styledh1 = styled.h1`
    margin-left: 1vw;
`

const CalendarContainer = styled.div`
    position:absolute;
    left:-21.5vw;
    top:45vh;
    display: flex;
    flex-direction: row;
    margin-top:1vh;
    margin-left: 1vw;
`

export default ProfileHome;
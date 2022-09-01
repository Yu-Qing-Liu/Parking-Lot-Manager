import { Dialog } from "@mui/material";
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from 'react';
import { Calendar } from "react-multi-date-picker";
import { useState } from "react";
import PaymentForm from "../HomePage/PaymentForm";
import moment from 'moment';

const PaymentModal = () => {

    const {
        state:{DisplayPaymentModal,PaymentModalData},
        actions:{ClosePaymentModal},
    } = useContext(ModalStateContext);

    const [value, setValue] = useState(new Date());

    if(PaymentModalData !== null) {
        return(
            <Dialog
            open = {DisplayPaymentModal}
            onClose = {() => ClosePaymentModal()}
            >
                <Wrapper>
                    <StyledTitle>Payment</StyledTitle>
                    <Styledh4>Available dates</Styledh4>
                    <CalendarContainer>
                        <Calendar 
                        value={value}
                        onChange={setValue}
                        mapDays={({ date, today, isSameDate }) => {
                            let props ={}
                            // Disable dates by default
                            props.style = {
                                color:"red",
                            }
                            props.disabled = true;
                            // Style the current day
                            if (isSameDate(date, today)) {
                                props.style.color = "darkgreen"
                                props.style.backgroundColor = "lightGreen"
                            }
                            // Method to style/enable dates based on days
                            let dayStrings = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
                            let styleDay = (dayString) => {
                                if(date.toDate().toDateString().split(" ")[0] === dayString) {
                                    props.style = {
                                        color:"blue",
                                        backgroundColor:"aliceblue",
                                    }
                                    props.disabled = false;
                                }
                            }
                            // Enable parking lot available dates
                            PaymentModalData.days.forEach((day) => {
                                if(day === "monday") {
                                    styleDay(dayStrings[0]);
                                } else if (day === "tuesday") {
                                    styleDay(dayStrings[1]);
                                } else if (day === "wednesday") {
                                    styleDay(dayStrings[2]);
                                } else if (day === "thursday") {
                                    styleDay(dayStrings[3]);
                                } else if (day === "friday") {
                                    styleDay(dayStrings[4]);
                                } else if (day === "saturday") {
                                    styleDay(dayStrings[5]);
                                } else if (day === "sunday") {
                                    styleDay(dayStrings[6]);
                                }
                            })
                            // Disable bookedDays
                            PaymentModalData.bookedDates.forEach((appoitment) => {
                                if(appoitment.date === moment(date.toString()).format('dddd DD MMMM YYYY')) {
                                    props.disabled = true;
                                    props.style = {
                                        color:"black",
                                        backgroundColor:"yellow",
                                    }
                                }
                            })

                            return props;
                        }}
                        />
                        <CalendarInfoContainer>
                            <Styledh41>Available Timeframe: </Styledh41>
                            <div>{`From ${PaymentModalData.startTime} to ${PaymentModalData.endTime}`}</div>
                            <Styledh41>Price: </Styledh41>
                            <div>{`$${PaymentModalData.price}`}</div>
                            <Styledh41>Address: </Styledh41>
                            <div>{`${PaymentModalData.address}, ${PaymentModalData.city}, ${PaymentModalData.country}`}</div>
                        </CalendarInfoContainer>
                    </CalendarContainer>
                    <Styledh4>Select Date:</Styledh4>
                    <StyledDate>{moment(value.toString()).format('dddd DD MMMM YYYY')}</StyledDate>
                    <PaymentForm 
                        date={moment(value.toString()).format('dddd DD MMMM YYYY')} 
                        uid={PaymentModalData._id}
                        availableDates={PaymentModalData.days}
                        appoitments={PaymentModalData.bookedDates}
                    >
                    </PaymentForm>
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
    text-align: center;
`

const Wrapper = styled.div`
    width: 35vw;
    height: 80vh;
`

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top:1vh;
    margin-left: 1vw;
`

const CalendarInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
`

const Styledh4 = styled.h4`
    margin:0;
    margin-top: 1vh;
    margin-left: 1vw;
`

const Styledh41 = styled.h4`
    margin:0;
    margin-bottom: 0.5vh;
    margin-top: 0.5vh;
`

const StyledDate = styled.div`
    padding: 1vh 2vw;
    width:fit-content;
    margin-left: 1vw;
    margin-top: 1vh;
    -webkit-box-shadow: 0px 0px 3px 0px #ACACAC; 
    box-shadow: 0px 0px 3px 0px #ACACAC;
`


export default PaymentModal;
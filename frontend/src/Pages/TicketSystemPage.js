import styled from "styled-components";
import { BsCalendar2Check } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ModalStateContext } from "../ModalStateContext";
import { AiFillWarning } from "react-icons/ai";

const TicketSystemPage = () => {
    let { uid } = useParams();

    let initialState = {
        loaded:false,
        data:null,
    };

    const [ticketData, setTicketData] = useState(initialState);

    const {
        actions:{ShowErrorModal,ShowLoadingModal,CloseLoadingModal}
    } = useContext(ModalStateContext);

    useEffect(() => {
        ShowLoadingModal();
        fetch(`/getTicket/${uid}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status === "success") {
                CloseLoadingModal();
                setTicketData({loaded:true,data:data.ticket});
            } else {
                ShowErrorModal({data:data.error});
            }
        })
        .catch((err) => {
            ShowErrorModal({data:err.message});
        })
    }, [uid])

    if(ticketData.loaded) {
        return(
            <Wrapper>
                <Container>
                    <TitleContainer>
                        <StyledIcon></StyledIcon>
                        <Styledh1>Appointment Confirmed</Styledh1>
                    </TitleContainer>
                    <InformationContainer>
                        <SingleInfoContainer>
                            <StyledLabel>Ticket ID:&nbsp;</StyledLabel>
                            <StyledInformation>{ticketData.data._id}</StyledInformation>
                        </SingleInfoContainer>
                        <SingleInfoContainer>
                            <StyledLabel>Date:&nbsp;</StyledLabel>
                            <StyledInformation>{ticketData.data.date}</StyledInformation>
                        </SingleInfoContainer>
                        <SingleInfoContainer>
                            <StyledLabel>Address:&nbsp;</StyledLabel>
                            <StyledInformation>{ticketData.data.address}</StyledInformation>
                        </SingleInfoContainer>
                        <SingleInfoContainer>
                            <StyledLabel>Price:&nbsp;</StyledLabel>
                            <StyledInformation>{`$${ticketData.data.price}`}</StyledInformation>
                        </SingleInfoContainer>
                        <NoticeBox>
                            <IconContainer>
                                <StyledWarningIcon></StyledWarningIcon>
                                <StyledWarningIcon></StyledWarningIcon>
                            </IconContainer>
                            <Styledp>
                                Please keep a copy of this form. <br/> You may enter the Ticket ID in the confirm payment page on our website
                                in order to verify that the owner has offered you a place to park your vehicle. <br/>
                                Upon confirmation, the owner shall receive your payment.
                                If you have not been offered a parking spot, you may contact support in order to get a refund. <br/>
                                <div>
                                    Note : If you do not confirm your payment and do not request a refund within 3 days after your appointment,
                                    Parking Lot Manager will assume that you have been serviced by the parking lot's owner and will procede with 
                                    the owner's payment. You will not be eligible for a refund.
                                </div>
                            </Styledp>
                            <IconContainer>
                                <StyledWarningIcon></StyledWarningIcon>
                                <StyledWarningIcon></StyledWarningIcon>
                            </IconContainer>
                        </NoticeBox>
                    </InformationContainer>
                    
                    
                </Container>
            </Wrapper>
        )
    } else {
        return(
            <div></div>
        )
    }
    
}

const Wrapper = styled.div`
    width: 100vw;
    height: 93.39vh;
    background-color: rgb(13,71,161,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 40vw;
    height: 70vh;
    -webkit-box-shadow: 0px 0px 3px 0px #A7A7A7; 
    box-shadow: 0px 0px 3px 0px #A7A7A7;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    left: -4vw;
`

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 35vw;
    height: 50vh;
    margin-top: 2vh;
`

const StyledIcon = styled(BsCalendar2Check)`
    width: 5vw;
    height: 10vh;
    color: green;
    margin-top: 2vh;
    margin-left: 2vw;
`

const Styledh1 = styled.h1`
    margin: 0;
    margin-top: 1vh;
    margin-left: 2vw;
`

const StyledLabel = styled.h3`
    margin: 0;
`

const StyledInformation = styled.h3`
    margin: 0;
    font-weight: normal;
`

const SingleInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1vh;
    margin-left: 1vw;
`

const NoticeBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1vh;
    margin-left: 1vw;
    margin-top: 2vh;
    height: 29vh;
    margin-right: 1vw;
    border: 1px solid black;
`

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 33vw;
`

const StyledWarningIcon = styled(AiFillWarning)`
    color:#ffc107;
    width: 2vw;
    height: 4vh;
`

const Styledp = styled.div`
    margin: 0;
    margin-left: 1vw;
    margin-right: 1vw;
    div {
        color:red;
    }
`

export default TicketSystemPage;
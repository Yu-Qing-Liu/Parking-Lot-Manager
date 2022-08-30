import styled from "styled-components";

const Appointment = ({parkingLot}) => {
    if(parkingLot !== null) {
        return(
            <Wrapper>
                <Container>
                    <StyledLabel>
                        Address:&nbsp; 
                    </StyledLabel>
                    <StyledData>
                        {parkingLot.address}
                    </StyledData>
                </Container>
                <Container2>
                    <StyledLabel>
                        Appointments:&nbsp; 
                    </StyledLabel>
                    <StyledData>
                        {
                            parkingLot.appointments.map((appointment) => {
                                return(
                                    <>
                                        <span>{appointment.date}</span>
                                        <span>;&nbsp;</span>
                                    </>
                                )
                            })
                        }
                    </StyledData>
                </Container2>
            </Wrapper>
        )
    } else {
        return(
            <></>
        )
    }
}

const Wrapper = styled.div`
    width:46vw;
    margin-left: 1.5vw;
    margin-top: 0.5vh;
    background-color: rgb(25,118,210,0.1);
    display: flex;
    flex-direction: column;
`

const StyledLabel = styled.span`
    color:#0d47a1;
    font-weight: bold;
`

const StyledData = styled.span`
    color:#0d47a1;
    margin-right: 1vw;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-top:2vh;
`

const Container2 = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-top:2vh;
    margin-bottom: 2vh;
`

export default Appointment;
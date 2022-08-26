import styled from "styled-components";

const ParkingLot = ({parkingLot}) => {
    console.log(parkingLot);
    return(
        <Wrapper>
            <FirstContainer>
                <StyledLabel>
                    Address:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {parkingLot.address}
                </StyledData>
            </FirstContainer>
            <InfoContainer>
                <StyledLabel>
                    City:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {parkingLot.city}
                </StyledData>
                <StyledLabel>
                    Country:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {parkingLot.country}
                </StyledData>
            </InfoContainer>
            <InfoContainer>
                <StyledLabel>
                    Available Between:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {`${parkingLot.startTime} and ${parkingLot.endTime}`}
                </StyledData>
                <StyledLabel>
                    Every:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {parkingLot.days.toString()}
                </StyledData>
            </InfoContainer>
            <InfoContainer>
                <StyledLabel>
                    Cost:&nbsp; 
                </StyledLabel>
                <StyledData>
                    {`$${parkingLot.price}`}
                </StyledData>
            </InfoContainer>
            <ButtonContainer>
                <StyledEditButton>
                    Edit
                </StyledEditButton>
                <StyledDeleteButton>
                    Delete
                </StyledDeleteButton>
            </ButtonContainer>
        </Wrapper>
    )
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

const FirstContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-top:2vh;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-top:1vh;
`

const ButtonContainer = styled.div`
    position: relative;
    top:-2.5vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const StyledEditButton = styled.button`
    margin-right: 0.5vw;
    padding: 0.5vh 1vw;
    border-width: 0;
    border-radius: 2vh;
    background-color:rgb(255,193,7);
    color:white;
    &:hover {
        background-color:rgb(255,193,7,0.8);
        cursor: pointer;
    }
`

const StyledDeleteButton = styled.button`
    margin-right: 1vw;
    padding: 0.5vh 1vw;
    border-width: 0;
    border-radius: 2vh;
    background-color:rgb(184,0,0);
    color:white;
    &:hover {
        background-color:rgb(184,0,0,0.8);
        cursor: pointer;
    }
`

export default ParkingLot;
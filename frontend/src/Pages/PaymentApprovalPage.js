import styled from "styled-components";

const PaymentApprovalPage = () => {
    return(
        <Wrapper>
            <Container onSubmit={(e) => {
                e.preventDefault();
                
            }}>
                <StyledLabel>Ticket ID</StyledLabel>
                <StyledInput id="ticketId" type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></StyledInput>
                <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
            </Container>
        </Wrapper>
    )
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

const Container = styled.form`
    width: 24.5vw;
    height: 22vh;
    -webkit-box-shadow: 0px 0px 3px 0px #A7A7A7; 
    box-shadow: 0px 0px 3px 0px #A7A7A7;
    background-color: rgb(255,255,255,0.7);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StyledLabel = styled.label`
    font-size: xx-large;
    font-weight: bold;
    margin-top: 2vh;
    margin-left: 1vw;
`

const StyledInput = styled.input`
    font-size: large;
    width: 22vw;
    margin-left: 1vw;
    margin-top: 1vh;
    height: 4vh;
`

const StyledSubmitButton = styled.button`
    font-size: large;
    width: 22.45vw;
    margin-left: 1vw;
    margin-top: 2vh;
    height: 5vh;
    border-radius: 2vw;
    border-width: 0;
    background-color: rgb(0,139,2);
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: rgb(0,139,2,0.8);
    }
`

export default PaymentApprovalPage;


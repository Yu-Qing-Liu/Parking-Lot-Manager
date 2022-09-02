import { useContext } from "react";
import styled from "styled-components";
import { GlobalStates } from "../../../GlobalStates";

const ProfileBalance = () => {

    const {
        state:{profileData},
    } = useContext(GlobalStates);

    return(
        <Wrapper>
            <Container>
                <h1>Balance: </h1>
                <div>{`$${profileData.balance}`}</div>
                <StyledButton onClick={(e) => {
                    e.preventDefault();
                }}
                >
                    Withdraw
                </StyledButton>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:absolute;
    left: 20vw;
    top: 6.6vh;
    width: 80vw;
    height: 93.48vh;
    background-color: rgb(13,71,161,0.02);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    background: #0D47A1;
    background: -moz-linear-gradient(left, #0D47A1 0%, #2196f3 50%, #BBDEFB 100%);
    background: -webkit-linear-gradient(left, #0D47A1 0%, #2196f3 50%, #BBDEFB 100%);
    background: linear-gradient(to right, #0D47A1 0%, #2196f3 50%, #BBDEFB 100%);
    -webkit-box-shadow: 0px 0px 5px 0px #2196F3; 
    box-shadow: 0px 0px 5px 0px #2196F3;
    width: 25vw;
    height: 30vh;

    display: flex;
    flex-direction: column;

    h1 {
        margin:0;
        color:white;
        margin-top: 2vh;
        margin-left: 1vw;
    }

    div {
        margin:0;
        color:white;
        margin-top: 1vh;
        margin-left: 1vw;
        font-weight: bold;
        font-size: 6vw;
    }
`

const StyledButton = styled.button`
    width: 10vw;
    height: 5vh;
    margin-left: 1vw;
    margin-top: 0.5vh;
    border-width: 0;
    background-color: #BBDEFB;
    border-radius: 1vw;
    color:#0D47A1;
    font-weight: bold;
    &:hover{
        cursor: pointer;
    }
`

export default ProfileBalance;
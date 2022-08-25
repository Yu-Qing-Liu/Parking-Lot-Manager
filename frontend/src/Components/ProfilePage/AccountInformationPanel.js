import { useContext } from "react";
import styled from "styled-components";
import { GlobalStates } from "../../GlobalStates";
import {MdEmail} from "react-icons/md";

const AccountInformationPanel = () => {

    const {
        state:{profileData,currentUserData}
    } = useContext(GlobalStates);

    return(
        <Wrapper>
            <Container>
                <InfoContainer>
                    <StyledEmailIcon></StyledEmailIcon>
                    <StyledInfoText>{""}</StyledInfoText>
                </InfoContainer>
                <InfoContainer>
                    
                    
                </InfoContainer>
            </Container> 
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    left: 22vw;
    top: 10vh;
    width:20vw;
    height: 15vw;
    border-radius: 1.5vw;
    background-color: rgb(171,184,195,0.2);
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    margin-left: 2vw;
    margin-top:2vh;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StyledInfoText = styled.span`

`

const StyledEmailIcon = styled(MdEmail)`
    margin-right: 1vw;
`

export default AccountInformationPanel;
import styled from "styled-components";
import {IoCalendarSharp} from "react-icons/io5";
import {MdAccountBox} from "react-icons/md";
import { GlobalStates } from "../../GlobalStates";
import { useContext } from "react";
import { AiFillCar } from "react-icons/ai";
import { GiBank } from "react-icons/gi";
import { ImHome } from "react-icons/im";

const SideBar = () => {

    const {
        actions:{updateProfilePageTab}
    } = useContext(GlobalStates);

    return(
        <StyledSideBar>
            <StyledContainer>
                <StyledButton onClick={() => updateProfilePageTab({page:"Home"})}>
                    <StyledHomeIcon></StyledHomeIcon>
                    <StyledButtonText>Home</StyledButtonText>
                </StyledButton>
                <StyledButton onClick={() => updateProfilePageTab({page:"Account"})}>
                    <StyledAccountIcon></StyledAccountIcon>
                    <StyledButtonText>Account</StyledButtonText>
                </StyledButton>
                <StyledButton onClick={() => updateProfilePageTab({page:"Create Parking Lot"})}>
                    <StyledCalendarIcon></StyledCalendarIcon>
                    <StyledButtonText>Create Parking Lot</StyledButtonText>
                </StyledButton>
                <StyledButton onClick={() => updateProfilePageTab({page:"Manage Parking Lot"})}>
                    <StyledCarIcon></StyledCarIcon>
                    <StyledButtonText>Manage Parking Lots</StyledButtonText>
                </StyledButton>
                <StyledButtonLast onClick={() => updateProfilePageTab({page:"Balance"})}>
                    <StyledBankIcon></StyledBankIcon>
                    <StyledButtonText>Balance</StyledButtonText>
                </StyledButtonLast>
            </StyledContainer>
        </StyledSideBar>
    )

}

const StyledSideBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    height:93.4vh;
    box-shadow: 1px 2px 2px 0px rgba(0,0,0,0.2);
    background: #19354D;
    background: -moz-linear-gradient(left, #19354D 0%, #2D5D86 100%);
    background: -webkit-linear-gradient(left, #19354D 0%, #2D5D86 100%);
    background: linear-gradient(to right, #19354D 0%, #2D5D86 100%);
    align-items: center;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 18vw;
    margin-top: 7vh;
`

const StyledButtonText = styled.span`
    font-size: large;
    color:white;
`

const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    border-width: 0;
    &:hover{
        background-color: rgb(171,184,195,0.5);
    }
`

const StyledButtonLast = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    border-width: 0;
    &:hover{
        background-color: rgb(171,184,195,0.5);
    }
`

const StyledHomeIcon = styled(ImHome)`
    color:white;
    margin:0.7vw;
    margin-right: 2vw;
    width: 2vw;
    height: 4vh;
`

const StyledAccountIcon = styled(MdAccountBox)`
    color:white;
    margin:0.7vw;
    margin-right: 2vw;
    width: 2vw;
    height: 4vh;
`

const StyledCalendarIcon = styled(IoCalendarSharp)`
    color:white;
    margin:0.7vw;
    margin-right: 2vw;
    width: 2vw;
    height: 4vh;
`

const StyledCarIcon = styled(AiFillCar)`
    color:white;
    margin:0.7vw;
    margin-right: 2vw;
    width: 2vw;
    height: 4vh;
`

const StyledBankIcon = styled(GiBank)`
    color:white;
    margin:0.7vw;
    margin-right: 2vw;
    width: 2vw;
    height: 4vh;
`

export default SideBar;
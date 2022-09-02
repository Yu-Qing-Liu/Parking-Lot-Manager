import styled from "styled-components";
import {BsSearch} from "react-icons/bs"

const SideBar = () => {

    return(
        <StyledSideBar>
            <Container>
                <StyledLabel>Filter Results Within A Certain Range</StyledLabel>
                <RadioButtonContainer>
                    <label style={{color:"white"}}>50m</label>
                    <StyledRadioButton type="radio" name="range"></StyledRadioButton>
                    <StyledLabel2>250m</StyledLabel2>
                    <StyledRadioButton type="radio" name="range"></StyledRadioButton>
                    <StyledLabel2>1km</StyledLabel2>
                    <StyledRadioButton type="radio" name="range"></StyledRadioButton>
                    <StyledLabel2>5km</StyledLabel2>
                    <StyledRadioButton type="radio" name="range"></StyledRadioButton>
                </RadioButtonContainer>
            </Container>
            
        </StyledSideBar>
    )
}

const StyledSideBar = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 20vw;
    height:93.37vh;;
    box-shadow: 1px 2px 2px 0px rgba(0,0,0,0.2);
    background: #19354D;
    background: -moz-linear-gradient(left, #19354D 0%, #2D5D86 100%);
    background: -webkit-linear-gradient(left, #19354D 0%, #2D5D86 100%);
    background: linear-gradient(to right, #19354D 0%, #2D5D86 100%);
    z-index: 1;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh;
`

const StyledLabel = styled.label`
    font-weight: bold;
    font-size: large;
    color:white;
    margin-top: 2vh;
`

const StyledLabel2 = styled.label`
    margin-left: 1vw;
    color:white;
`

const RadioButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1vh;
`

const StyledRadioButton = styled.input`
    height: 1vw;
    width: 1vw;
`

export default SideBar;
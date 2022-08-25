import styled from "styled-components";
import {BsSearch} from "react-icons/bs"

const SideBar = () => {

    return(
        <StyledSideBar>
            <Container>
                <StyledLabel>Search For A Location</StyledLabel>
                <StyledBsSearch></StyledBsSearch>
                <StyledInput placeholder={"Enter a location"}></StyledInput>
            </Container>
            <Container>
                <StyledLabel>Filter Results Within A Certain Range</StyledLabel>
                <RadioButtonContainer>
                    <label>50m</label>
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
    display: flex;
    flex-direction: column;
    max-width: 20vw;
    height:95vh;
    box-shadow: 1px 2px 2px 0px rgba(0,0,0,0.2);
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StyledLabel = styled.label`
    font-weight: bold;
    font-size: large;
    color:#0d47a1;
    margin-left: 0.5vw;
    margin-top: 2vh;
`

const StyledBsSearch = styled(BsSearch)`
    position: relative;
    top:1.25vw;
    left: 17.2vw;
`

const StyledLabel2 = styled.label`
    margin-left: 1vw;
`

const StyledInput = styled.input`
    margin-left: 1vw;
    border-width: 0;
    font-size: x-large;
    color:grey;
    -webkit-box-shadow: 1px 1px 2px 0px #000000; 
    box-shadow: 1px 1px 2px 0px #000000;
    position: relative;
    width: 17.5vw;
    height: 4vh;
    background-color: transparent;
    top:-0.5vh;
`

const RadioButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin:0.5vh;
    margin-left: 1vw;
`

const StyledRadioButton = styled.input`
    height: 1vw;
    width: 1vw;
`

export default SideBar;
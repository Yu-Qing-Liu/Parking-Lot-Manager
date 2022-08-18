import styled from "styled-components";

const SideBar = () => {

    return(
        <StyledSideBar>
            <Container>
                <StyledLabel>Search For A Location</StyledLabel>
                <StyledInput></StyledInput>
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
    border-right-style:solid;
    border-right-width:2px;
    border-right-color:#0d47a1;
    border-top-style:solid;
    border-top-width:2px;
    border-top-color:#0d47a1;
    background-color: #b3e5fc;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding:1.5vh;
    border-bottom-style:solid;
    border-bottom-width:2px;
    border-bottom-color:#0d47a1;
    background-color: #b3e5fc;
`

const StyledLabel = styled.label`
    margin:0.5vh;
    font-weight: bold;
    font-size: large;
    color:#0d47a1;
`

const StyledLabel2 = styled.label`
    margin-left: 1vw;
`

const StyledInput = styled.input`
    margin:0.5vh;
    padding-right: 2.9vw;
    border-color:#0d47a1;
    font-size: x-large;
`

const RadioButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin:0.5vh;
`

const StyledRadioButton = styled.input`
    height: 1vw;
    width: 1vw;
`

export default SideBar;
import styled from "styled-components";

const DayCheckBox = ({label,id,handleClick}) => {

    return(
        <InputContainer>
            <StyledLabel>{label}</StyledLabel>
            <StyledCheckBox type="checkbox" id={id} onClick={handleClick}></StyledCheckBox>
        </InputContainer>
    )
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2vh;
    margin-right: 1vw;
`

const StyledCheckBox = styled.input`
    width: 1.2vw;
    height: 2.4vh;
    background-color: white;
    border-radius: 50px;
    border: 1px solid black;
    &:hover {
        cursor: pointer;
    }
`

const StyledLabel = styled.label`
    font-size: large;
`

export default DayCheckBox;
import styled from "styled-components"
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {AiOutlineCheck} from "react-icons/ai";

const FormItem = ({label,id,placeholder,buttonState,handleClickEdit,handleClickSubmit}) => {

    return(
        <Container>
            <InputContainer>
                <StyledLabel>{label}</StyledLabel>
                    <InnerContainer>
                        {buttonState ? (
                            <StyledInput id={id} placeholder={placeholder}></StyledInput>
                        ) : (
                            <StyledInput id={id} placeholder={placeholder} disabled></StyledInput>
                        )}
                        <EditInfoButton type="button" onClick={handleClickEdit}>
                            <StyledEditIcon></StyledEditIcon>
                        </EditInfoButton>
                        <EditInfoButton1 type="button" onClick={handleClickSubmit}>
                            <StyledCheckIcon></StyledCheckIcon>
                        </EditInfoButton1>
                    </InnerContainer>
            </InputContainer>
        </Container>
    )

}

const Container = styled.div`
    display:flex;
    flex-direction: row;
`

const StyledLabel = styled.label`
    font-size: large;
    font-weight: bold;
    color:black;
`

const StyledInput = styled.input`
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    border-width: 0;
    font-size: large;
    width: 18vw;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 2vh;
`

const InnerContainer = styled.div`
    margin-top:1vh;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const EditInfoButton = styled.button`
    margin-left: 0.4vw;
    background-color: #fccb00;
    border-width: 0;
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    &:hover{
        background-color: rgb(177,184,195,0.3);
        cursor: pointer;
    }
`

const EditInfoButton1 = styled.button`
    margin-left: 0.4vw;
    background-color: #008b02;
    border-width: 0;
    -webkit-box-shadow: 0px 0px 3px 1px #B4B4B4; 
    box-shadow: 0px 0px 3px 1px #B4B4B4;
    &:hover{
        background-color: rgb(177,184,195,0.3);
        cursor: pointer;
    }
`

const StyledEditIcon = styled(MdOutlineDriveFileRenameOutline)`
    width:1vw;
    height:2.5vh;
`

const StyledCheckIcon = styled(AiOutlineCheck)`
    width:1vw;
    height:2.5vh;
`

export default FormItem;
import styled from "styled-components";
import { ModalStateContext } from "../../ModalStateContext";
import { useContext } from "react";

const Header = () => {

    const {
        actions:{ShowSignInModal},
    } = useContext(ModalStateContext);

    const handleClick = () => {
        ShowSignInModal();
    }

    return(
        <StyledHeader>
            <StyledTitle>Parking Lot Manager</StyledTitle>
            <ButtonContainer>
                <StyledButton onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}>
                    Sign In
                </StyledButton>
            </ButtonContainer>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #0288d1;
`

const StyledTitle = styled.h1`
    margin:0px;
    color:white;
    margin-left: 2vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledButton = styled.button`
    border-width: 0px;
    background-color: #0d47a1;
    padding-left: 1vw;
    padding-right: 1vw;
    color:white;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

export default Header;
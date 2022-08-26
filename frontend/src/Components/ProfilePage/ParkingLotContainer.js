import styled from "styled-components"
import { GlobalStates } from "../../GlobalStates";
import { useContext, useEffect } from "react";

const ParkingLotContainer = () => {

    const {
        state:{parkingLotsHasLoaded,parkingLots},
        actions:{updateParkingLots},
    } = useContext(GlobalStates)

    useEffect(() => {

    }, []);

    return(
        <Wrapper>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
    width: 50vw;
    height: 85vh;
    -webkit-box-shadow: 0px 0px 5px 0px #8F8F8F; 
    box-shadow: 0px 0px 5px 0px #8F8F8F;
    display: flex;
    align-items: center;
    overflow-y: scroll;
`

export default ParkingLotContainer;


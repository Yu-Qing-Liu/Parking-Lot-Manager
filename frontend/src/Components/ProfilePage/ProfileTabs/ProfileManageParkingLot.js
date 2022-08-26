import styled from "styled-components";
import ParkingLotContainer from "../ParkingLotContainer";

const ProfileManageParkingLot = () => {
    return(
        <Wrapper>
            <ParkingLotContainer></ParkingLotContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:absolute;
    left: 22vw;
    top: 10vh;
`

export default ProfileManageParkingLot;
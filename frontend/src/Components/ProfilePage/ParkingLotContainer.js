import styled from "styled-components"
import { GlobalStates } from "../../GlobalStates";
import { useContext, useEffect } from "react";
import { ModalStateContext } from "../../ModalStateContext";
import { CircularProgress } from "@mui/material";
import ParkingLot from "./ParkingLot";

const ParkingLotContainer = () => {

    const {
        state:{parkingLotsHasLoaded,parkingLots,currentUserData,refetchingParkingLots},
        actions:{updateParkingLots},
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal,CloseLoadingModal,ShowLoadingModal},
    } = useContext(ModalStateContext)

    useEffect(() => {
        ShowLoadingModal();
        fetch(`/getParkingLots/${currentUserData.data.uid}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status === "success") {
                updateParkingLots({data:data.data});
                CloseLoadingModal();
            } else {
                CloseLoadingModal();
                ShowErrorModal({data:data.error})
            }
        })
    }, [refetchingParkingLots]);

    if(parkingLotsHasLoaded) {
        return(
            <Wrapper>
                <Styledh1>Manage Parking Lots</Styledh1>
                <Container>
                {
                    parkingLots.map((parkingLot) => {
                        return(
                            <ParkingLot parkingLot={parkingLot}></ParkingLot>
                        )
                    })
                }
                </Container>
            </Wrapper>
        )
    } else {
        return(
            <LoadingContainer>
                <CircularProgress size={"2vw"}></CircularProgress>
            </LoadingContainer>
        )
    }
    
}

const Wrapper = styled.div`
    background-color: white;
    width: 50vw;
    height: 85vh;
    -webkit-box-shadow: 0px 0px 5px 0px #8F8F8F; 
    box-shadow: 0px 0px 5px 0px #8F8F8F;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const LoadingContainer = styled.div`
    width: 50vw;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    background-color: white;
    width: 50vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
`

const Styledh1 = styled.h1`
    margin:0;
    margin-left: 1.5vw;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
`

export default ParkingLotContainer;


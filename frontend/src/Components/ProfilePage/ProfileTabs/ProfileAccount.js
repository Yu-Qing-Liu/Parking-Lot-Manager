import styled from "styled-components";
import { useContext } from "react";
import { GlobalStates } from "../../../GlobalStates";
import { ModalStateContext } from "../../../ModalStateContext";
import FormItem from "../FormItem";
import {IoIosWarning} from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const ProfileAccount = () => {

    let history = useHistory();

    const {
        state:{profileData, profileAccountButtonsState, currentUserData},
        actions:{updateProfileAccountButtonsState,updateCurrentUserData}
    } = useContext(GlobalStates);

    const {
        actions:{ShowErrorModal,ShowLoadingModal,CloseLoadingModal}
    } = useContext(ModalStateContext);
    
    return(
        <Wrapper>
            <Styledh1>Change Your Personal Information</Styledh1>
            <StyledForm onSubmit={(e) => {
                e.preventDefault();
                ShowLoadingModal();
                if(
                    (profileAccountButtonsState.emailButton ||
                    profileAccountButtonsState.phoneNumberButton ||
                    profileAccountButtonsState.firstNameButton ||
                    profileAccountButtonsState.lastNameButton ||
                    profileAccountButtonsState.addressButton ||
                    profileAccountButtonsState.cityButton ||
                    profileAccountButtonsState.postalCodeButton ||
                    profileAccountButtonsState.countryButton)
                ) {
                    CloseLoadingModal();
                    ShowErrorModal({data:"Please confirm all of your changes"});
                } else {
                    fetch(`/updateUser/${currentUserData.data.uid}`, {
                        method: 'PATCH',
                        headers: {
                            Accept: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:document.getElementById("changeEmail").value,
                            phoneNumber:document.getElementById("changePhone").value,
                            firstName:document.getElementById("changeFirstName").value,
                            lastName:document.getElementById("changeLastName").value,
                            address:document.getElementById("changeAddress").value,
                            city:document.getElementById("changeCity").value,
                            postalCode:document.getElementById("changePostalCode").value,
                            country:document.getElementById("changeCountry").value
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        if(data.status === "success") {
                            const auth = getAuth();
                            signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                CloseLoadingModal();
                                history.push("/");
                                updateCurrentUserData({data:null,exists:false});
                            })
                            .catch((err) => {
                                CloseLoadingModal();
                                ShowErrorModal({data:err.message});
                            });
                        } else {
                            CloseLoadingModal();
                            ShowErrorModal({data:data.error});
                        } 
                    })
                }
            }}
            >
                <Container>
                    <FormItem 
                        label={"Email"}
                        id={"changeEmail"}
                        placeholder={profileData.email}
                        buttonState={profileAccountButtonsState.emailButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, emailButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, emailButton:false})}
                    >
                    </FormItem>
                    <FormItem 
                        label={"Phone"}
                        id={"changePhone"}
                        placeholder={profileData.phoneNumber}
                        buttonState={profileAccountButtonsState.phoneNumberButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, phoneNumberButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, phoneNumberButton:false})}
                    >
                    </FormItem>
                </Container>
                <Container>
                    <FormItem 
                        label={"First Name"}
                        id={"changeFirstName"}
                        placeholder={profileData.firstName}
                        buttonState={profileAccountButtonsState.firstNameButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, firstNameButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, firstNameButton:false})}
                    >
                    </FormItem>
                    <FormItem 
                        label={"Last Name"}
                        id={"changeLastName"}
                        placeholder={profileData.lastName}
                        buttonState={profileAccountButtonsState.lastNameButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, lastNameButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, lastNameButton:false})}
                    >
                    </FormItem>
                </Container>
                <Container>
                    <FormItem 
                        label={"Address"}
                        id={"changeAddress"}
                        placeholder={profileData.address}
                        buttonState={profileAccountButtonsState.addressButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, addressButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, addressButton:false})}
                    >
                    </FormItem>
                    <FormItem 
                        label={"City"}
                        id={"changeCity"}
                        placeholder={profileData.city}
                        buttonState={profileAccountButtonsState.cityButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, cityButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, cityButton:false})}
                    >
                    </FormItem>
                </Container>
                <Container>
                    <FormItem 
                        label={"Postal Code"}
                        id={"changePostalCode"}
                        placeholder={profileData.postalCode}
                        buttonState={profileAccountButtonsState.postalCodeButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, postalCodeButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, postalCodeButton:false})}
                    >
                    </FormItem>
                    <FormItem 
                        label={"Country"}
                        id={"changeCountry"}
                        placeholder={profileData.country}
                        buttonState={profileAccountButtonsState.countryButton}
                        handleClickEdit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, countryButton:true})}
                        handleClickSubmit={() => updateProfileAccountButtonsState({...profileAccountButtonsState, countryButton:false})}
                    >
                    </FormItem>
                </Container>
                <ButtonContainer>
                    <SubmitButton type="submit">Submit Changes</SubmitButton>
                    <DeleteButton type="button" onClick={(e) => {
                        e.preventDefault();
                        ShowLoadingModal();
                        fetch(`/deleteUser/${currentUserData.data.uid}`, {
                            method: 'DELETE',
                            headers: {
                                Accept: "application/json",
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(res => res.json())
                        .then((data) => {
                            if(data.status === "success") {
                                CloseLoadingModal();
                            } else {
                                CloseLoadingModal();
                                ShowErrorModal({data:data.error});
                            }
                        })
                        .catch((err) => {
                            CloseLoadingModal();
                            ShowErrorModal({data:err.message});
                        })
                    }}
                    >
                        Delete Account
                    </DeleteButton>
                </ButtonContainer>
                <WarningContainer>
                    <WarningIcon></WarningIcon>
                    <Styledh3>The following action will cause your account to log out!</Styledh3>
                    <WarningIcon></WarningIcon>
                </WarningContainer>
            </StyledForm>
        </Wrapper>
        
    )

}

const Wrapper = styled.div`
    position:absolute;
    left: 22vw;
    top: 9vh;
`

const Styledh1 = styled.h1`
    margin:0;
    color:#0d47a1;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display:flex;
    flex-direction: row;
    width: 48vw;
    justify-content:space-between;
    margin-top: 1vh;
`

const SubmitButton = styled.button`
    margin-top: 4vh;
    width: 10vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    background-color: rgb(0,139,2);
    color:white;
    font-weight: bold;
    border-width: 0;
    border-radius: 1vw;
    &:hover{
        cursor: pointer;
        background-color: rgb(0,139,2,0.8);
    }
`

const DeleteButton = styled.button`
    margin-top: 4vh;
    width: 10vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    background-color: rgb(183,28,28);
    color:white;
    font-weight: bold;
    border-width: 0;
    border-radius: 1vw;
    &:hover{
        cursor: pointer;
        background-color: rgb(183,28,28,0.8);
    }
`

const WarningContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const WarningIcon = styled(IoIosWarning)`
    margin-top:2vh;
    width:2vw;
    height: 4vh;
    color:#fccb00;
`

const Styledh3 = styled.h3`
    color:#fccb00;
    margin:0;
    margin-top:2vh;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default ProfileAccount;
import { useReducer, createContext } from "react";

export const GlobalStates = createContext();

const initialState = {
    currentUserData:{
        hasLoaded:false,
        data:null,
        exists:false,
    },
    profileData:{
        hasLoaded:false,
        email:null,
        phoneNumber:null,
        firstName:"Not set yet",
        lastName:"Not set yet",
        address:"Not set yet",
        city:"Not set yet",
        postalCode:"Not set yet",
        country:"Not set yet",
    },
    profilePageTab:"Home",
    profileAccountButtonsState: {
        emailButton:false,
        phoneNumberButton:false,
        firstNameButton:false,
        lastNameButton:false,
        addressButton:false,
        cityButton:false,
        postalCodeButton:false,
        countryButton:false,
    },
    parkingLotDays: {
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        sunday:false,
    },
    parkingLotsHasLoaded:false,
    parkingLots:[],
}

const reducer = (state, action) => {
    switch(action.type) {
        case "update-current-user-data": {
            return {
                ...state,
                currentUserData:{
                    hasLoaded:true,
                    data:action.data,
                    exists:action.exists,
                },
            }
        }
        case "update-profile-data": {
            return {
                ...state,
                profileData:{
                    hasLoaded:true,
                    email:action.email,
                    phoneNumber:action.phoneNumber,
                    firstName:action.firstName,
                    lastName:action.lastName,
                    address:action.address,
                    city:action.city,
                    postalCode:action.postalCode,
                    country:action.country,
                },
            }
        }
        case "update-profile-page-tab": {
            return {
                ...state,
                profilePageTab:action.page,
            }
        }
        case "update-profile-account-buttons-state": {
            return {
                ...state,
                profileAccountButtonsState:{
                    emailButton:action.emailButton,
                    phoneNumberButton:action.phoneNumberButton,
                    firstNameButton:action.firstNameButton,
                    lastNameButton:action.lastNameButton,
                    addressButton:action.addressButton,
                    cityButton:action.cityButton,
                    postalCodeButton:action.postalCodeButton,
                    countryButton:action.countryButton,
                },
            }
        }
        case "update-parking-lot-days" : {
            return {
                ...state,
                parkingLotDays:{
                    monday:action.monday,
                    tuesday:action.tuesday,
                    wednesday:action.wednesday,
                    thursday:action.thursday,
                    friday:action.friday,
                    saturday:action.saturday,
                    sunday:action.sunday,
                }
            }
        }
        case "update-parking-lots": {
            return {
                ...state,
                parkingLots:[...initialState.parkingLots,action.data],
                parkingLotsHasLoaded:true,
            }
        }
    }
}

export const GlobalStatesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateCurrentUserData = (data) => {
        dispatch({
            type:"update-current-user-data",
            ...data
        })
    }

    const updateProfileData = (data) => {
        dispatch({
            type:"update-profile-data",
            ...data
        })
    }

    const updateProfilePageTab = (data) => {
        dispatch({
            type:"update-profile-page-tab",
            ...data
        })
    }

    const updateProfileAccountButtonsState = (data) => {
        dispatch({
            type:"update-profile-account-buttons-state",
            ...data
        })
    }

    const updateParkingLotDays = (data) => {
        dispatch({
            type:"update-parking-lot-days",
            ...data
        })
    }

    const updateParkingLots = (data) => {
        dispatch ({
            type:"update-parking-lots",
            ...data
        })
    }

    return(
        <GlobalStates.Provider
            value = {{
                state,
                dispatch,
                actions: {
                    updateCurrentUserData,
                    updateProfileData,
                    updateProfilePageTab,
                    updateProfileAccountButtonsState,
                    updateParkingLotDays,
                    updateParkingLots
                },
            }}
        >
            {children}
        </GlobalStates.Provider>
    )
    
}
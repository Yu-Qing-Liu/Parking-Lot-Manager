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
    profileAccountButtonsState:{
        emailButton:false,
        phoneNumberButton:false,
        firstNameButton:false,
        lastNameButton:false,
        addressButton:false,
        cityButton:false,
        postalCodeButton:false,
        countryButton:false,
    },
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
                    emailButton:action.emailButtonState,
                    phoneNumberButton:action.phoneButtonState,
                    firstNameButton:action.firstNameButtonState,
                    lastNameButton:action.lastNameButtonState,
                    addressButton:action.addressButtonState,
                    cityButton:action.cityButtonState,
                    postalCodeButton:action.postalCodeButtonState,
                    countryButton:action.countryButtonState,
                },
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

    return(
        <GlobalStates.Provider
            value = {{
                state,
                dispatch,
                actions: {
                    updateCurrentUserData,
                    updateProfileData,
                    updateProfilePageTab,
                    updateProfileAccountButtonsState
                },
            }}
        >
            {children}
        </GlobalStates.Provider>
    )
    
}
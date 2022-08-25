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
        firstName:"Not set yet",
        lastName:"Not set yet",
        address:"Not set yet",
        city:"Not set yet",
        postalCode:"Not set yet",
        country:"Not set yet",
    }
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
                    hasLoaded:false,
                    firstName:action.firstName,
                    lastName:action.lastName,
                    address:action.address,
                    city:action.city,
                    postalCode:action.postalCode,
                    country:action.country,
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

    const updateProfileData = (data) => {
        dispatch({
            type:"update-profile-data",
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
                    updateProfileData
                },
            }}
        >
            {children}
        </GlobalStates.Provider>
    )
    
}
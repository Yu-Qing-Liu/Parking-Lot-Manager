import { useReducer, createContext } from "react";

export const GlobalStates = createContext();

const initialState = {
    currentUserData:{
        hasLoaded:false,
        data:null,
        exists:false,
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

    return(
        <GlobalStates.Provider
            value = {{
                state,
                dispatch,
                actions: {
                    updateCurrentUserData
                },
            }}
        >
            {children}
        </GlobalStates.Provider>
    )
    
}
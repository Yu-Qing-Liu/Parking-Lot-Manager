import { useReducer, createContext } from "react";

export const ModalStateContext = createContext();

const initialState = {
    DisplaySignInModal:false,
    DisplayRegistrationModal:false,
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'show-sign-in-modal': {
            return {
                ...state,
                DisplaySignInModal:true,
            }
        }
        case 'close-sign-in-modal': {
            return {
                ...state,
                DisplaySignInModal:false,
            }
        }
        case 'show-registration-modal': {
            return {
                ...state,
                DisplayRegistrationModal:true,
            }
        }
        case 'close-registration-modal': {
            return {
                ...state,
                DisplayRegistrationModal:false,
            }
        }
    }
}

export const ModalStateContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const ShowSignInModal = () => {
        dispatch({
            type: 'show-sign-in-modal',
        });
    }
    const CloseSignInModal = () => {
        dispatch({
            type: 'close-sign-in-modal',
        });
    }
    const ShowRegistrationModal = () => {
        dispatch({
            type: 'show-registration-modal',
        });
    }
    const CloseRegistrationModal = () => {
        dispatch({
            type: 'close-registration-modal',
        });
    }

    return(
        <ModalStateContext.Provider
            value = {{
                state,
                dispatch,
                actions: {
                    ShowSignInModal,
                    CloseSignInModal,
                    ShowRegistrationModal,
                    CloseRegistrationModal,
                },
            }}
        >
            {children}
        </ModalStateContext.Provider>
    )
    
}
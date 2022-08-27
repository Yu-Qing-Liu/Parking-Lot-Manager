import { useReducer, createContext } from "react";

export const ModalStateContext = createContext();

const initialState = {
    DisplaySignInModal:false,
    DisplayRegistrationModal:false,
    DisplayErrorModal:false,
    ErrorModalContent:null,
    DisplayEditParkingLotModal:false,
    EditParkingLotModalData:null,
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
        case 'show-error-modal': {
            return {
                ...state,
                DisplayErrorModal:true,
                ErrorModalContent:action.data,
            }
        }
        case 'close-error-modal': {
            return {
                ...state,
                DisplayErrorModal:false,
                ErrorModalContent:null,
            }
        }
        case 'show-edit-parking-lot-modal': {
            return {
                ...state,
                DisplayEditParkingLotModal:true,
                EditParkingLotModalData:action.data,
            }
        }
        case 'close-edit-parking-lot-modal': {
            return {
                ...state,
                DisplayEditParkingLotModal:false,
                EditParkingLotModalData:null,
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
    const ShowErrorModal = (data) => {
        dispatch({
            type: 'show-error-modal',
            ...data,
        });
    }
    const CloseErrorModal = () => {
        dispatch({
            type: 'close-error-modal',
        });
    }

    const ShowEditParkingLotModal = (data) => {
        dispatch({
            type: 'show-edit-parking-lot-modal',
            ...data
        })
    }

    const CloseEditParkingLotModal = () => {
        dispatch({
            type: 'close-edit-parking-lot-modal'
        })
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
                    ShowErrorModal,
                    CloseErrorModal,
                    ShowEditParkingLotModal,
                    CloseEditParkingLotModal
                },
            }}
        >
            {children}
        </ModalStateContext.Provider>
    )
    
}
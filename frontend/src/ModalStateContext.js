import { useReducer, createContext } from "react";

export const ModalStateContext = createContext();

const initialState = {
    DisplaySignInModal:false,
    DisplayRegistrationModal:false,
    DisplayErrorModal:false,
    ErrorModalContent:null,
    DisplayEditParkingLotModal:false,
    EditParkingLotModalData:null,
    DisplayLoadingModal:false,
    PaymentModalData:null,
    DisplayPaymentModal:false,
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
        case 'show-loading-modal': {
            return {
                ...state,
                DisplayLoadingModal:true,
            }
        }
        case 'close-loading-modal': {
            return {
                ...state,
                DisplayLoadingModal:false,
            }
        }
        case 'show-payment-modal': {
            return {
                ...state,
                DisplayPaymentModal:true,
                PaymentModalData:action.data,
            }
        }
        case 'close-payment-modal': {
            return {
                ...state,
                DisplayPaymentModal:false,
                PaymentModalData:null,
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

    const ShowLoadingModal = () => {
        dispatch({
            type:"show-loading-modal"
        })
    }

    const CloseLoadingModal = () => {
        dispatch({
            type:"close-loading-modal"
        })
    }

    const ShowPaymentModal = (data) => {
        dispatch({
            type:"show-payment-modal",
            ...data
        })
    }

    const ClosePaymentModal = () => {
        dispatch({
            type:"close-payment-modal",
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
                    CloseEditParkingLotModal,
                    ShowLoadingModal,
                    CloseLoadingModal,
                    ShowPaymentModal,
                    ClosePaymentModal,
                },
            }}
        >
            {children}
        </ModalStateContext.Provider>
    )
    
}
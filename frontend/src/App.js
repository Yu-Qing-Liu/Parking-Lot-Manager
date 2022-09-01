import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Header";
import ProfilePage from "./Pages/ProfilePage";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalStates } from "./GlobalStates";
import { ModalStateContextProvider } from "./ModalStateContext";
import { useContext, useEffect } from "react";
import LoadingModal from "./Components/Modals/LoadingModal";
import ErrorModal from "./Components/Modals/ErrorModal";
import PaymentApprovalPage from "./Pages/PaymentApprovalPage";
import TicketSystemPage from "./Pages/TicketSystemPage";


const firebaseConfig = {
  apiKey: "AIzaSyCHzG3ZLRAT_S8_56iqHho6j3o62Y-m5Wk",
  authDomain: "parking-lot-manager-fd530.firebaseapp.com",
  projectId: "parking-lot-manager-fd530",
  storageBucket: "parking-lot-manager-fd530.appspot.com",
  messagingSenderId: "58417145784",
  appId: "1:58417145784:web:e22f1e539a2ed9fb9ed14d"
};

initializeApp(firebaseConfig);

const App = () => {

  const {
    actions:{updateCurrentUserData,updateAllParkingLotsData}
  } = useContext(GlobalStates);

  const auth = getAuth();
  useEffect(() => {
    // Check if a user is signed in, and log them in in accordance.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        updateCurrentUserData({data:user,exists:true});
      }
    });
  },[])

  useEffect(() => {
    // Fetch all the parking lots data in order to map
    fetch("/getAllParkingLots")
    .then(res => res.json())
    .then((data) => {
      if(data.status === "success") {
        updateAllParkingLotsData({data:data.parkingLots});
      } else {
        console.log(data.error);
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
  },[])

  return (
    <BrowserRouter>
      <ModalStateContextProvider>
        <Header></Header>
        <LoadingModal></LoadingModal>
        <ErrorModal></ErrorModal>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/profile/:uid">
            <ProfilePage></ProfilePage>
          </Route>
          <Route exact path="/approval">
            <PaymentApprovalPage></PaymentApprovalPage>
          </Route>
          <Route exact path="/ticket/:uid">
            <TicketSystemPage></TicketSystemPage>
          </Route>
        </Switch>
      </ModalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;

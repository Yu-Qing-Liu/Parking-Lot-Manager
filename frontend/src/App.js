import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Header";
import ProfilePage from "./Pages/ProfilePage";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalStates } from "./GlobalStates";
import { ModalStateContextProvider } from "./ModalStateContext";
import { useContext, useEffect } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyCHzG3ZLRAT_S8_56iqHho6j3o62Y-m5Wk",
  authDomain: "parking-lot-manager-fd530.firebaseapp.com",
  projectId: "parking-lot-manager-fd530",
  storageBucket: "parking-lot-manager-fd530.appspot.com",
  messagingSenderId: "58417145784",
  appId: "1:58417145784:web:e22f1e539a2ed9fb9ed14d"
};

const app = initializeApp(firebaseConfig);

const App = () => {

  const {
    state:{currentUserData},
    actions:{updateCurrentUserData}
  } = useContext(GlobalStates);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        updateCurrentUserData({data:user,exists:true});
      }
    });
  },[])

  return (
    <BrowserRouter>
      <ModalStateContextProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/profile/:uid">
            <ProfilePage></ProfilePage>
          </Route>
        </Switch>
      </ModalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;

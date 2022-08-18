import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import { ModalStateContextProvider } from "./ModalStateContext";

const App = () => {
  return (
    <BrowserRouter>
      <ModalStateContextProvider>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </ModalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;

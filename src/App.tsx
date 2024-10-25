import { BrowserRouter } from "react-router-dom";
import { BindRoutes } from "./bind-routes";
import LoginContextProvider from "./context/LoginContext";
import UserContextProvider from "./context/UserContext";
import VendorContextProvider from "./context/VendorContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <LoginContextProvider>
          <VendorContextProvider>
            <BindRoutes />
          </VendorContextProvider>
        </LoginContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

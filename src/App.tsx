import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { BrowserRouter } from "react-router";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;

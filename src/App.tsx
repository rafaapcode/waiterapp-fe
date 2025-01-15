import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

import Header from "./components/Header/Header";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <>
      <Header />
      <Orders />
      <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App;

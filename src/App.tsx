import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

import Tabs from "./components/tabs/Tabs";
import Header from "./pages/Header/Header";
import Orders from "./pages/Orders/OrdersPage";

function App() {
  return (
    <>
      <Header />
      <Tabs />
      <Orders />
      <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App;

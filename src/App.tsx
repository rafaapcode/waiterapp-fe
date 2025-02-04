import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import TabsContent from "./components/tabs/TabContent";
import Tabs from "./components/tabs/Tabs";
import TabsProvider from "./contexts/TabsProvider";
import Header from "./pages/Header/Header";

function App() {

  return (
    <TabsProvider>
      <>
        <Header />
        <Tabs />
        <TabsContent />
        <ToastContainer position="bottom-center" />
      </>
    </TabsProvider>
  );
}

export default App;

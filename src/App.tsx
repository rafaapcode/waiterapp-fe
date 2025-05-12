import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import Router from "./router/Router";


const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" />
        <Router />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
